import { validationResult } from 'express-validator';
import Sets from '../models/sets-model.js';
import Cards from '../models/cards-model.js';
import { asyncHandler } from '../lib/utils.js';
import Users from '../models/users-model.js';

// post create set
export const postCreateSet = asyncHandler(async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new Error('Validation failed, Please fill out all fields');
    err.status = 422;
    throw err;
  }

  const { userId: user_id } = req.params;
  const { title, description } = req.body;

  const setData = {
    title,
    description,
    user_id,
  };

  // Find all users
  const users = await Users.findAll();
  const allSets = await Sets.findAll();
  console.log('All users:', JSON.stringify(users, null, 2));
  console.log('All sets:', JSON.stringify(allSets, null, 2));
  console.log('setData', setData);
  try {
    const set = await Sets.create(setData);
    res.status(200).json({
      msg: 'Set created!',
      set,
    });
    
  } catch (error) {
    const err = new Error('Error creating set: ', error);
    console.log('Error creating set: ', err);
    throw err;
  }
}, 'creating set: ');

// get sets
export const getSets = asyncHandler(async (req, res, next) => {
  const { userId: user_id } = req.params;
  let sets;

  // check for userId
  if (!user_id) {
    const err = new Error('The userId is required in the URL. /userId');
    err.status = 400;
    return next(err);
  }

  // fetch all sets
  sets = await Sets.findAll({
    raw: true,
    where: { user_id },
    order: [['id', 'DESC']],
  });

  // get card count for each set
  for (const [index, set] of sets.entries()) {
    const count = await Cards.count({
      where: { user_id, set_id: set.id },
    });

    // add card count to each set
    sets[index].cardCount = count;
  }

  res.status(200).json({
    msg: 'success',
    sets,
  });
}, 'retrieving sets data');

// get edit set
export const getEditSet = asyncHandler(async (req, res) => {
  const { setId: id } = req.params;

  const set = await Sets.findByPk(id, { raw: true });
  res.status(200).json({
    set,
    msg: 'success',
  });
}, 'retrieving  set data: ');

// put edit set
export const putEditSet = asyncHandler(async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new Error('Validation failed, Please fill out all fields');
    err.status = 422;
    throw err;
  }

  const { title, description } = req.body;
  const { setId: id } = req.params;
  const setData = {
    title,
    description,
  };

  const set = await Sets.update(setData, {
    where: { id },
  });
  res.status(200).json({
    msg: 'Set updated!',
    set,
  });
}, 'editing set: ');

// delete set
export const deleteSet = asyncHandler(async (req, res, next) => {
  const { setId: id, userId: user_id } = req.params;
  let isSetDeleted = false;
  let set = null;
  let deletedCard = null;
  let newCards = null;

  // check for set
  try {
    set = await Sets.findByPk(id, { raw: true });

    if (set.user_id !== Number(user_id)) {
      const err = new Error('Your not authorized to edit this set');
      err.status = 403;
      next(err);
    }
  } catch (error) {
    const err = new Error(error);
    err.status = 403;
    next(err);
  }

  // delete cards
  if (set) {
    try {
      deletedCard = await Cards.destroy({
        where: { user_id, set_id: id },
      });
      console.log(`All cards were deleted for set ${id} `, deletedCard);
    } catch (error) {
      const err = new Error(`Error deleting cards for set ${id}: `, error);
      throw err;
    }
  }

  // delete set
  try {
    newCards = await Cards.findAll({
      raw: true,
      where: { user_id, id },
    });

    if (newCards.length === 0) {
      isSetDeleted = await Sets.destroy({
        where: { id, user_id },
      });

      console.log('Set ' + id + ' is deleted');

      res.status(200).json({
        msg: 'Your set and all of its cards have been deleted',
        isSetDeleted,
      });
    }
  } catch (error) {
    const err = new Error(`Error deleting set ${id}: `, error);
    throw err;
  }
}, 'Error deleting set - ');
