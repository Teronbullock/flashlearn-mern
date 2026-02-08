import Cards from '../models/cards-model.js';
import Sets from '../models/sets-model.js';
import { checkResourceOwnership } from '../services/permission-service.js';
/**
 * @desc    Get all cards for a specific set
 * @route   GET /api/sets/:setId/cards
 * @access  Private
 */
export const getCardsAllCards = async (req, res) => {
    const setId = req.params.setId;
    const userId = req.userId;
    const set = await checkResourceOwnership(Sets, setId, userId);
    const cards = await Cards.findAll({
        where: { set_id: set.id },
        raw: true,
        order: [['id', 'ASC']],
    });
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
    if (!setId || !cardId) {
        const err = new Error('please add card credentials');
        err.status = 40;
    }
    const card = await checkResourceOwnership(Cards, cardId, userId);
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
 * @desc    Create a new card in a set
 * @route   POST /api/sets/:setId/cards
 * @access  Private
 */
export const postAddCard = async (req, res) => {
    const validationErrors = validationResult(req);
    const userId = req.userId;
    const { term, definition } = req.body;
    const { setId } = req.params;
    if (!validationErrors.isEmpty()) {
        const err = new Error('Validation failed, Please fill out all fields');
        err.status = 422;
        throw err;
    }
    // Check if the set belongs to the user
    const card = await checkResourceOwnership(Sets, setId, userId);
    if (!req.body.term) {
        const err = new Error('Please fill in all fields');
        err.status = 400;
    }
    try {
        const updatedCard = await Cards.create({
            term,
            definition,
            user_id: userId,
            set_id: card.id,
            bg_color: '#FAEBE8',
            text_color: '#CA3916',
        });
        res.status(200).json({
            msg: 'Card Added!',
            card: updatedCard,
        });
    }
    catch (err) {
        console.error(err);
        throw new Error('Error creating card');
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
    const card = await checkResourceOwnership(Cards, cardId, userId);
    const data = {
        term,
        definition,
        bg_color,
        text_color,
        id: card.id,
    };
    if (!data.term) {
        const err = new Error('Please fill in all fields');
        err.status = 400;
        return next(err);
    }
    const cardUpdate = await Cards.update(data, {
        where: { id: card.id },
    });
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
    const card = await checkResourceOwnership(Cards, cardId, userId);
    if (!card) {
        const err = new Error('You do not have the correct permission to delete this card');
        err.status = 400;
    }
    isCardDeleted = await Cards.destroy({ where: { id: card.id } });
    console.log('card deleted');
    res.status(200).json({
        msg: 'Card Deleted!',
        isCardDeleted: 1,
    });
};
//# sourceMappingURL=card-controller.js.map