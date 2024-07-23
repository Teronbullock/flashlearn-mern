import Sets from '../models/sets-model.js';
import Cards from '../models/cards-model.js';
import { asyncHandler } from '../lib/utils.js';

// get sets
export const getSets = asyncHandler(
  async (req, res, next) => {
    const { userId: user_id } = req.params;
    let rows;

    // check for userId
    if (!user_id) {
      const err = new Error('The userId is required in the URL. /userId');
      err.status = 400;
      return next(err);
    }

    // get sets
    rows = await Sets.findAll({
      raw: true,
      where: { user_id },
      order: [['id', 'DESC']],
    });

    // get cards for each set
    // const setCardCount = [];

    for (const [index, set] of rows.entries()) {
      const { count, rows } = await Cards.findAndCountAll({
        where: { user_id, set_id: set.id },
        raw: true,
      });
      // setCardCount.push({setID: set.id, count});
      console.log('count: ', count, rows, set.id);
      rows[index].cardCount = count;
    }

    // console.log('getSets: ', rows);
    res.status(200).json({
      msg: 'success',
      rows: rows,
      // cards: setCardCount,
    });
  },
  'Error retrieving sets data: ',
  500
);

// put edit set
export const putEditSet = asyncHandler(
  async (req, res) => {
    const { title, description } = req.body;

    const setData = {
      title,
      description,
    };

    const setID = req.params.setID;

    if (setData.title) {
      const set = await Sets.update(setData, {
        where: {
          id: setID,
        },
      });
      res.status(200).json({
        msg: 'Set updated!',
        set,
      });
    }
  },
  'Error editing  set: ',
  500
);

// post create set
export const postCreateSet = asyncHandler(
  async (req, res) => {
    // const { userId } = req.params;
    const { user_id, title, description } = req.body;

    const setData = {
      title,
      description,
      user_id,
    };

    if (setData.title) {
      const set = await Sets.create(setData);
      res.status(200).json({
        msg: 'Set created!',
        set,
      });
    }
  },
  'Error creating set: ',
  500
);

// // get set
// export const getSet = asyncHandler(
//   async (req, res) => {

//     const set = await Sets.findByPk(req.params.setID, { raw: true });

  // const { count, rows } = await Cards.findAndCountAll({
  //   where: { user_id: req.session.userId, set_id: req.params.setID },
  //   raw: true,
  // });

//     res.render('set', { set, rows, userId: req.session.userId });
//   },
//   'Error retrieving set data: ',
//   500
// );

// get edit set
export const getEditSet = asyncHandler(
  async (req, res) => {
    const set = await Sets.findByPk(req.params.setID, { raw: true });
    res.status(200).json({
      set,
      msg: 'success',
    });
  },
  'Error retrieving  set data: ',
  500
);

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
    err.status = err.status || 404;
    throw err;
  }

  // delete cards
  if (set) {
    try {
      deletedCard = await Cards.destroy({
        where: { user_id },
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
