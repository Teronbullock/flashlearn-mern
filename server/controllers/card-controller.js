import Card from '../models/cards-model.js';
import { asyncHandler } from '../lib/utils.js';

//get all cards
export const getCardsAllCards = asyncHandler(
  async (req, res) => {
    const setId = req.params.setId;
    const cards = await Card.findAll({
      where: { set_id: setId },
      raw: true,
    });
  console.log('getCardsAllCards', cards);

    res.status(200).json({
      "message": 'success',
      "cards": cards,
    });

},'Error retrieving all cards data: ',
  500
);

// get add card
export const getAddCard = (req, res) => {
  const { setId } = req.params;
  res.render('card-form', {
    setId,
    view: 'add',
    userId: req.session.userId,
    cardScript: true, 
  });
};

// post add card
export const postAddCard = asyncHandler( 
  async (req, res, next) => {
    const { setId } = req.params;
    const cardDefinition = req.body.definition ? req.body.definition : 'No definition provided';

    const data = {
      card_term: req.body.term,
      card_definition: cardDefinition,
      user_id: req.session.userId,
      set_id: setId,
      card_color: req.body['card-color'],
      card_text_color: req.body['card-text-color'],
    };

    if (data.card_term && data.card_definition) {
      const card = await Card.create(data);

      console.log('card updated', card);

      res.status(200).json({
        setId,
        msg: 'Card Added!',
        card
      });
    } else {
      const err = new Error('Please fill in all fields');
      err.status = 400;
      return next(err);
    } 
  },
  'Error creating card: ',
  500
);


// get edit card
export const getEditCard = asyncHandler(
  async (req, res) => {
    
    const { setId, cardId } = req.params;
    const card = await Card.findByPk(cardId, {raw: true});

    res.status(200).json({
      setId,
      card,
    });

  },
  'Error retrieving card data: ',
  500
);


// put edit card
export const putEditCard = asyncHandler(
  async (req, res) => {
    const { setId, cardId } = req.params;
    const data = {
      card_term: req.body.card_term,
      card_definition: req.body.card_definition,
      card_color: req.body.card_color,
      card_text_color: req.body.card_text_color,
      id: req.body.id,
    };

    if (data.id !== cardId) {
      return res.status(400).json({ error: "Card ID in body does not match URL" });
    }

  console.log('data: ', data);
    if (data.card_term && data.card_definition) {
      const cardUpdate = await Card.update(data, {
        where: { ID: cardId },
      });

      const card = await Card.findByPk(cardId, { raw: true });

      console.log('card updated', cardUpdate);

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
  },
  'Error updating card: ',
  500
);


// delete card
export const deleteCard = asyncHandler(
  async (req, res) => {
    const { setId, cardID } = req.params;

    if (req.session.userId !== setId) {
      await Card.destroy({ where: { ID: cardID} });
      
      console.log('card deleted');
      res.redirect(`/set/${setId}`);
    } else {
      const err = new Error(
        'You do not have the correct permission to delete this card'
      );
      err.status = 400;
      return next(err);
    }
  },
  'Error deleting card: ',
  500
);


// get view cards
export const getViewCards = asyncHandler(
  async (req, res) => {
    const setId = req.params.setId;
    const { page } = req.query;
    const nextPage = Number(page) + 1;
    const prevPage = Number(page) - 1;
    
    const {count, rows } = await Card.findAndCountAll({
      where: { set_id: setId },
      raw: true,
      offset: (page - 1),
      limit: 1,
    });

    let cards = rows;


    let templateData = { 
      cardScript: true,
      setId,
      page,
      nextPage,
      prevPage,
      count,
      frontCardText: cards[0]['card_term'],
      backCardText: cards[0]['card_definition'],
      cardColor: cards[0]['card_color'],
      cardTextColor: cards[0]['card_text_color'],
    };

    res.render('card', templateData);
  },
  'Error retrieving cards data: ',
  500
);