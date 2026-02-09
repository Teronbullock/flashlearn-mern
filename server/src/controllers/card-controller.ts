import { eq } from 'drizzle-orm';
import { ZodError } from 'zod';
import { checkResourceOwnership } from '../services/permission-service.js';
import { db } from '../db/database.js';
import { schemaDb, schemaZod } from '@flashlearn/schema-db';

const { sets, cards } = schemaDb;
const {cardsInsertSchema} = schemaZod;

/**
/**
 * @desc    Get all cards for a specific set
 * @route   GET /api/sets/:setId/cards
 * @access  Private
 */
export const getCardsAllCards = async (req, res) => {
  const setId = req.params.setId;
  const userId = req.userId;

  const set = await checkResourceOwnership(sets, setId, userId);

  const cards = await db.select().from(cards).where(eq(
    cards.set_id, setId
  )).orderBy(asc(cards.id));


  res.status(200).json({
    msg: 'success',
    cards: cards,
  });
};

/**
 * @desc    Get a single card for editing
 * @route   GET /api/sets/:setId/cards/:cardId
 * @access  Private
 */
export const getEditCard = async (req, res) => {
  const { setId, cardId } = req.params;
  const userId = req.userId;

  if  (!setId || !cardId) {
    const err = new Error('please add card credentials');
    err.status = 40
  }

  const card = await checkResourceOwnership(cards, cardId, userId);

  res.status(200).json({
    setId,
    card,
  });
};

/**
 * @desc    Get cards with pagination for viewing
 * @route   GET /api/sets/:setId/cards/view
 * @access  Private
 */
export const getViewCards = async (req, res) => {
  const setId = req.params.setId;
  const { page } = req.query;

  const { count, rows } = await db.select()
  .from(cards)
  .where(eq(
    cards.set_id, setId
  ))
  .orderBy(asc(cards.id))
  .limit(1)
  .offset(page - 1);


  let card = rows[0];

  res.status(200).json({
    msg: 'success',
    card,
    count,
  });
};

/**
 * @desc    Create a new card in a set
 * @route   POST /api/sets/:setId/cards
 * @access  Private
 */
export const postAddCard = async (req, res) => {
  const userId = req.userId;
  const {setId } = req.params;
  
  try {

  const validCardInfo = await cardsInsertSchema.parseAsync({
    // term: req.body.term,
    // definition: req.body.definition,
    term: '',
    definition: null,
  });

  const { term, definition } = validCardInfo;

  // Check if the set belongs to the user
  const card = await checkResourceOwnership(sets, setId, userId);


    const updatedCard = await db.insert(cards).values({
      term,
      definition,
      userId: userId,
      setId: card.id,
  }).returning();

  if (!updatedCard) {
    throw new Error('Error creating cardss');
  }

    res.status(200).json({
      msg: 'Card Added!',
      card: updatedCard,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "ZodError") {
      // const errorMessage = err.errors.map((e) => e.message).join(' ');
      // throw new Error(`Validation Error: ${errorMessage}`);
     const zodErr = err as ZodError;
    console.log(zodErr.flatten());
    } else {
      console.log('----ERROR2----', err);
      // console.error('Error creating card:', err);
      // throw new Error('Error creating card');
    }

  }
};

/**
 * @desc    Update an existing card
 * @route   PUT /api/sets/:setId/cards/:cardId
 * @access  Private
 */
export const putEditCard = async (req, res) => {
  const validationErrors = validationResult(req);
  const { setId, cardId } = req.params;
  const userId = req.userId;
  const { term, definition, bg_color, text_color } = req.body;

  if (!validationErrors.isEmpty()) {
    const err = new Error('Validation failed, Please fill out all fields');
    err.status = 422;
    throw err;
  }

  const card = await checkResourceOwnership(cards, cardId, userId);

  const data = {
    term,
    definition,
    bg_color,
    text_color,
    id: card.id,
  };


  if (!data.term ) {
    const err = new Error('Please fill in all fields');
    err.status = 400;
    return next(err);
  }

    const cardUpdate = await db.update(cards).set().where(eq(
      cards.id, card.id
    )).returning();
    

    res.status(200).json({
      setId,
      cardUpdate,
      msg: 'Card Updated!',
    });
  
};

/**
 * @desc    Delete a card
 * @route   DELETE /api/sets/:setId/cards/:cardId
 * @access  Private
 */
export const deleteCard = async (req, res) => {
  const { cardId } = req.params;
  const userId = req.userId;
  let isCardDeleted = false;

  const card = await checkResourceOwnership(cards, cardId, userId);

  if (!card) {
    const err = new Error('You do not have the correct permission to delete this card');
    err.status = 400;
  }

  isCardDeleted = await cards.destroy({ where: { id: card.id } });

    console.log('card deleted');
    res.status(200).json({
      msg: 'Card Deleted!',
      isCardDeleted: 1,
    });

};
