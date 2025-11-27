import { validationResult } from 'express-validator';
import Sets from '../models/sets-model.js';
import Cards from '../models/cards-model.js';

// post create set
export const postCreateSet = async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new Error('Validation failed, Please fill out all fields');
    err.status = 422;
    throw err;
  }

  const { title, description } = req.body;

  const setData = {
    title,
    description,
    user_id: req.userId,
  };

  // check if set exist in DB
  const userSets = await Sets.findOne({
    raw: true,
    where: {
      user_id,
      title,
    },
  });

  // return if set exists
  if (userSets) {
    throw new Error('set name already taken');
  }

  try {
    const set = await Sets.create(setData);
    res.status(200).json({
      msg: 'Set created!',
      set,
    });
  } catch (error) {
    throw new Error('Error creating set');
  }
};

// get all sets
export const getAllSets = async (req, res, next) => {

  const user_id = req.userId;
  let sets;

  // check for userId
  if (!user_id) {
    console.Error('The userSlug is required in the URL. /userSlug');
    throw new Error('Cannot get sets without a userId');
  }

  try {
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
  } catch (err) {
    throw new Error('Error retrieving sets');
  }
};

// get edit set
export const getEditSet = async (req, res) => {
  const { setId: id } = req.params;
  const user_id = req.userId;
  const set = await Sets.findByPk(id, { raw: true });

  if (set.user_id !== user_id) {
    throw new Error('unauthorized access to set');
  }

  res.status(200).json({
    set,
    msg: 'success',
  });
};

// put edit set
export const putEditSet = async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new Error('Validation failed, Please fill out all fields');
    err.status = 422;
    throw err;
  }

  const { title, description } = req.body;
  const { setId: id } = req.params;
  const user_id = req.userId;
  const setData = {
    title,
    description,
  };

  // check if set exist in db
  const userSets = await Sets.findOne({
    raw: true,
    where: {
      title,
      user_id,
    },
  });

  if (userSets) {
    throw new Error('set name already taken');
  }

  try {
    const set = await Sets.update(setData, {
      where: { id },
    });
    res.status(200).json({
      msg: 'Set updated!',
      set,
    });
  } catch (err) {
    throw new Error('Error: could not update set');
  }
};

// delete set
export const deleteSet = async (req, res, next) => {
  const { setId: id } = req.params;
  const user_id = req.userId;
  let isSetDeleted = false;
  let set = null;
  let deletedCard = null;
  let newCards = null;

  // check for set
  try {
    set = await Sets.findOne({
      raw: true,
      id,
      user_id,
    });

    if (!set) {
      throw new Error('unauthorized access to set');
    }
  } catch (err) {
    console.error('Error retrieving set', err);
    throw new Error('Error retrieving set');
  }

  // delete cards
  try {
    deletedCard = await Cards.destroy({
      raw: true,
      where: { user_id, set_id: id },
    });
    console.log(`All cards were deleted for set ${id} `, deletedCard);
  } catch (err) {
    console.error(err);
    throw new Error(`Error deleting cards for set ${id}: `);
  }

  // delete set
  try {
    newCards = await Cards.findAll({
      raw: true,
      where: { user_id, id },
    });

    if (newCards.length === 0) {
      isSetDeleted = await Sets.destroy({
        raw: true,
        where: { id, user_id },
      });

      console.log('Set ' + id + ' is deleted');

      res.status(200).json({
        msg: 'Your set and all of its cards have been deleted',
        isSetDeleted,
      });
    }
  } catch (err) {
    console.error(err);
    throw new Error(`Error deleting set ${id}: `);
  }
};
