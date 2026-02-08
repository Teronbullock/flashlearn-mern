import Sets from '../models/sets-model.js';
import Cards from '../models/cards-model.js';
import { checkResourceOwnership } from '../services/permission-service.js';
/**
 * @desc    Get all sets for a user with card counts
 * @route   GET /api/sets
 * @access  Private
 */
export const getAllSets = async (req, res, next) => {
    const userId = req.userId;
    let sets;
    // check for userId
    if (!userId) {
        throw new Error('Cannot get sets without a userId');
    }
    try {
        // fetch all sets for the authenticated user
        sets = await Sets.findAll({
            raw: true,
            where: { user_id: userId },
            order: [['id', 'DESC']],
        });
        // get card count for each set
        for (const [index, set] of sets.entries()) {
            const count = await Cards.count({
                where: { user_id: userId, set_id: set.id },
            });
            // add card count to each set
            sets[index].cardCount = count;
        }
        res.status(200).json({
            msg: 'success',
            sets,
        });
    }
    catch (err) {
        throw new Error('Error retrieving sets');
    }
};
/**
 * @desc    Get a specific set for editing
 * @route   GET /api/sets/:setId
 * @access  Private
 */
export const getEditSet = async (req, res) => {
    const { setId } = req.params;
    const userId = req.userId;
    const set = await checkResourceOwnership(Sets, setId, userId);
    res.status(200).json({
        set,
        msg: 'success',
    });
};
/**
 * @desc    Create a new set for a user
 * @route   POST /api/sets
 * @access  Private
 */
export const postCreateSet = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const err = new Error('Validation failed, Please fill out all fields');
        err.status = 422;
        throw err;
    }
    const { title, description } = req.body;
    const userId = req.userId;
    // check for title or throw an error
    if (!title) {
        throw new Error('Title is required');
    }
    // check if set exists in DB
    const existingSet = await Sets.findOne({
        raw: true,
        where: {
            user_id: userId,
            title,
        },
    });
    // return if set exists
    if (existingSet) {
        throw new Error('set name already taken');
    }
    try {
        const set = await Sets.create({
            title,
            description,
            user_id: userId,
        });
        res.status(200).json({
            msg: 'Set created!',
            set,
        });
    }
    catch (error) {
        throw new Error('Error creating set');
    }
};
/**
 * @desc    Update an existing set
 * @route   PUT /api/sets/:setId
 * @access  Private
 */
export const putEditSet = async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const err = new Error('Validation failed, Please fill out all fields');
        err.status = 422;
        throw err;
    }
    const { title, description } = req.body;
    const { setId } = req.params;
    const userId = req.userId;
    // Check if the set belongs to the user
    await checkResourceOwnership(Sets, setId, userId);
    // check if set exist in db
    const existingSet = await Sets.findOne({
        raw: true,
        where: {
            title,
            user_id: userId,
        },
    });
    if (existingSet) {
        throw new Error('set name already taken');
    }
    try {
        const set = await Sets.update({
            title,
            description,
        }, {
            where: { id: setId },
        });
        res.status(200).json({
            msg: 'Set updated!',
            set,
        });
    }
    catch (err) {
        throw new Error('Error: could not update set');
    }
};
/**
 * @desc    Delete a set and all its associated cards
 * @route   DELETE /api/sets/:setId
 * @access  Private
 */
export const deleteSet = async (req, res) => {
    const { setId } = req.params;
    const userId = req.userId;
    // Check if the set belongs to the user
    const set = await checkResourceOwnership(Sets, setId, userId);
    let isSetDeleted = false;
    let deletedCard = null;
    let newCards = null;
    // delete cards
    try {
        deletedCard = await Cards.destroy({
            raw: true,
            where: { user_id: set.user_id, set_id: set.id },
        });
        console.log(`All cards were deleted for set ${set.setId} `, deletedCard);
    }
    catch (err) {
        console.error(set);
        throw new Error(`Error deleting cards for set ${set.setId}: `);
    }
    // delete set
    try {
        newCards = await Cards.findAll({
            raw: true,
            where: { user_id: set.user_id, set_id: set.id },
        });
        if (newCards.length !== 0) {
            const err = new Error('Cannot delete set with cards');
            err.status = 400;
            throw err;
        }
        isSetDeleted = await Sets.destroy({
            raw: true,
            where: { id: set.id, user_id: set.user_id },
        });
        console.log('Set ' + setId + ' is deleted');
        res.status(200).json({
            msg: 'Your set and all of its cards have been deleted',
            isSetDeleted,
        });
    }
    catch (err) {
        throw new Error(`Error deleting set ${setId}: `);
    }
};
//# sourceMappingURL=set-controller.js.map