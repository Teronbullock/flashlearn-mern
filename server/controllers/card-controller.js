import Cards from '../models/cards-model.js';
import { validationResult } from 'express-validator';

/**
 * -- post add card --
 */
export const postAddCard = async (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new Error('Validation failed, Please fill out all fields');
    err.status = 422;
    throw err;
  }

  const { term, definition, setId: set_id } = req.body;
  const { userId: user_id } = req.userData;

  const data = {
    term,
    definition,
    user_id,
    set_id,
    bg_color: '#ffffff',
    text_color: '#000000',
  };

  try {
    if (!data.term) {
      throw new Error('Please fill in all fields');
    }

    const card = await Cards.create(data);

    res.status(200).json({
      msg: 'Card Added!',
      card,
    });
  } catch (err) {
    console.error(err);
    throw new Error('Error creating card');
  }
};

/**
 * -- get all cards --
 */
export const getCardsAllCards = async (req, res) => {
  const setId = req.params.setId;

  const cards = await Cards.findAll({
    where: { set_id: setId },
    raw: true,
    order: [['id', 'ASC']],
  });

  res.status(200).json({
    msg: 'success',
    cards: cards,
  });
};

/**
 * -- get edit card --
 */
export const getEditCard = async (req, res) => {
  const { setId, cardId } = req.params;
  const card = await Cards.findByPk(cardId, { raw: true });

  res.status(200).json({
    setId,
    card,
  });
};

/**
 * -- get view cards --
 */
export const getViewCards = async (req, res) => {
  const setId = req.params.setId;
  const { page } = req.query;

  const { count, rows } = await Cards.findAndCountAll({
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
};

/**
 * -- put edit card --
 */
export const putEditCard = async (req, res) => {
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
    return res.status(400).json({ error: 'Card ID in body does not match URL' });
  }

  if (data.term && data.definition) {
    const cardUpdate = await Cards.update(data, {
      where: { id: id },
    });

    const card = await Cards.findByPk(id, { raw: true });

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
};

/**
 * -- delete card --
 */
export const deleteCard = async (req, res) => {
  const { cardId: id } = req.params;
  let isCardDeleted = false;

  if (id) {
    isCardDeleted = await Cards.destroy({ where: { id } });

    console.log('card deleted');
    res.status(200).json({
      msg: 'Card Deleted!',
      isCardDeleted: 1,
    });
  } else {
    const err = new Error('You do not have the correct permission to delete this card');
    err.status = 400;
    return next(err);
  }
};
