import Card from '../models/cards-model.js';
import { asyncHandler } from '../lib/utils.js';
import { validationResult } from 'express-validator';

/**
 * -- post add card --
 */
export const postAddCard = asyncHandler(
  async (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const err = new Error('Validation failed, Please fill out all fields');
      err.status = 422;
      throw err;
    }

    const { term, definition, user_id, set_id } = req.body;

    const data = {
      term,
      definition,
      user_id,
      set_id,
      bg_color: '#ffffff',
      text_color: '#000000',
    };

    if (data.term) {
      const card = await Card.create(data);

      res.status(200).json({
        msg: 'Card Added!',
        card,
      });
    } else {
      const err = new Error('Please fill in all fields');
      throw err;
    }
  },
  'creating card: ',
  400
);

/**
 * -- get all cards --
 */
export const getCardsAllCards = asyncHandler(async (req, res) => {
  const setId = req.params.setId;

  const cards = await Card.findAll({
    where: { set_id: setId },
    raw: true,
    order: [['id', 'ASC']],
  });

  res.status(200).json({
    msg: 'success',
    cards: cards,
  });
}, 'retrieving all cards data: ');

/**
 * -- get edit card --
 */
export const getEditCard = asyncHandler(async (req, res) => {
  const { setId, cardId } = req.params;
  const card = await Card.findByPk(cardId, { raw: true });

  res.status(200).json({
    setId,
    card,
  });
}, 'retrieving card data: ');

/**
 * -- get view cards --
 */
export const getViewCards = asyncHandler(async (req, res) => {
  const setId = req.params.setId;
  const { page } = req.query;

  const { count, rows } = await Card.findAndCountAll({
    where: { set_id: setId },
    raw: true,
    offset: page - 1,
    limit: 1,
    order: [['id', 'ASC']],
  });

  let card = rows[0];

  res.status(200).json({
    msg: 'success',
    card,
    count,
  });
}, 'Error retrieving cards data: ');

/**
 * -- put edit card --
 */
export const putEditCard = asyncHandler(async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new Error('Validation failed, Please fill out all fields');
    err.status = 422;
    throw err;
  }

  const { setId } = req.params;
  const { term, definition, bg_color, text_color, id } = req.body;

  const data = {
    term,
    definition,
    bg_color,
    text_color,
    id,
  };

  if (data.id !== id) {
    return res
      .status(400)
      .json({ error: 'Card ID in body does not match URL' });
  }

  if (data.term && data.definition) {
    const cardUpdate = await Card.update(data, {
      where: { id: id },
    });

    const card = await Card.findByPk(id, { raw: true });

    res.status(200).json({
      setId,
      card,
      cardUpdate,
      msg: 'Card Updated!',
    });
  } else {
    const err = new Error('Please fill in all fields');
    err.status = 400;
    return next(err);
  }
}, 'updating card: ');

/**
 * -- delete card --
 */
export const deleteCard = asyncHandler(async (req, res) => {
  const { cardId: id, setId } = req.params;
  let isCardDeleted = false;

  if (id) {
    isCardDeleted = await Card.destroy({ where: { id } });

    console.log('card deleted');
    res.status(200).json({
      msg: 'Card Deleted!',
      isCardDeleted: 1,
    });
  } else {
    const err = new Error(
      'You do not have the correct permission to delete this card'
    );
    err.status = 400;
    return next(err);
  }
}, 'deleting card: ');
