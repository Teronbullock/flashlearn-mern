import { asc, eq } from 'drizzle-orm';
import { ZodError, flattenError } from 'zod';
import { checkResourceOwnership } from '../services/permission-service.js';
import { db } from '../db/database.js';
import { setsTable, cardsTable , cardFormSchema } from '@flashlearn/schema-db';


/**
/**
 * @desc    Get all cards for a specific set
 * @route   GET /api/sets/:setId/cards
 * @access  Private
 */
export const getCardsAllCards = async (req, res) => {
  const setId = req.params.setId;
  const userId = req.userId;

  const set = await checkResourceOwnership(setsTable, setId, userId);
  
  const cards = await db.select().from(cardsTable).where(eq(
    cardsTable.setId, set.id
  )).orderBy(asc(cardsTable.id));
  
  
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
    err.status = 400;
    throw err;
  }

  const cardRes = await checkResourceOwnership(cardsTable, cardId, userId);

  if (!cardRes) {
    const err = new Error('user is not authorized to edit this card');
    err.status = 400;
    throw err;
  }

  const card = await db.select().from(cardsTable).where(eq(
    cardsTable.id, cardRes.id
  ));

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

  const card = await db.select()
  .from(cardsTable)
  .where(eq(
    cardsTable.setId, setId
  ))
  .orderBy(asc(cardsTable.id))
  .limit(1)
  .offset(page - 1);


  res.status(200).json({
    msg: 'success',
    card,
    // count,
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
  

  const validCardInfo = await cardFormSchema.parseAsync({
    term: req.body.term,
    definition: req.body.definition,
  });

  
  const { term, definition } = validCardInfo;

  // Check if the set belongs to the user
  const card = await checkResourceOwnership(setsTable, setId, userId);

  // const err = new Error('Error creating cards');
  // throw err

  const updatedCard = await db.insert(cardsTable).values({
    term,
    definition,
    userId: userId,
    setId: card.id,
  }).returning();

  if (!updatedCard) {
    throw new Error('Error creating cards');
  }

  res.status(200).json({
    msg: 'Card Added!',
    card: updatedCard,
  });

};

/**
 * @desc    Update an existing card
 * @route   PUT /api/sets/:setId/cards/:cardId
 * @access  Private
 */
export const putEditCard = async (req, res) => {
  const { setId, cardId } = req.params;
  const userId = req.userId;

  const validCardInfo = await cardFormSchema.parseAsync({
    term: req.body.term,
    definition: req.body.definition,
  });

  const { term, definition } = validCardInfo;
  const card = await checkResourceOwnership(cardsTable, cardId, userId);

  if (!card) {
    throw new Error('user is not authorized to edit this card');
  }

  const cardUpdate = await db.update(cardsTable).set({
    term: card.term,
    definition: card.definition
  }).where(eq(
      cardsTable.id, card.id
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
