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
      msg: 'success',
      cards: cards,
    });

},'Error retrieving all cards data: ',
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

// get view cards
export const getViewCards = asyncHandler(
  async (req, res) => {
    const setId = req.params.setId;
    // const { page } = req.query;
    // const nextPage = Number(page) + 1;
    // const prevPage = Number(page) - 1;
    
    const {count, rows } = await Card.findAndCountAll({
        where: { set_id: setId },
        raw: true,
        // offset: (page - 1),
        // limit: 1,
      });
      
      let cards = rows;
      
      console.log('cards', cards);

    // let templateData = { 
    //   cardScript: true,
    //   setId,
    //   page,
    //   nextPage,
    //   prevPage,
    //   count,
    //   cards,
    //   frontCardText: cards[0]['card_term'],
    //   backCardText: cards[0]['card_definition'],
    //   cardColor: cards[0]['card_color'],
    //   cardTextColor: cards[0]['card_text_color'],
    // };

    res.status(200).json({
      msg: 'success',
      cards
    });
  },
  'Error retrieving cards data: ',
  500
);

// post add card
export const postAddCard = asyncHandler( 
  async (req, res, next) => {
    const { setId } = req.params;
    const {term, definition, user_id, set_id} = req.body;

    const data = {
      term,
      definition,
      user_id,
      set_id,
      bg_color: '#ffffff',
      text_color: '#000000',
    };

    if (data.term && data.definition) {
      const card = await Card.create(data);

      console.log('card updated', card);

      res.status(200).json({
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

// put edit card
export const putEditCard = asyncHandler(
  async (req, res) => {
    const { setId, cardId } = req.params;
    const { term, definition, bg_color, text_color, id } = req.body;

    const data = {
      term,
      definition,
      bg_color,
      text_color,
      id,
    };

    console.log('data: ', data);

    if (data.id !== id) {
      return res.status(400).json({ error: "Card ID in body does not match URL" });
    }

  console.log('data: ', data);
    if (data.term && data.definition) {
      const cardUpdate = await Card.update(data, {
        where: { id: id },
      });

      const card = await Card.findByPk(id, { raw: true });

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
    const { id, setId } = req.body;
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
  },
  'Error deleting card: ',
  500
);