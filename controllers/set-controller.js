import Sets from '../models/sets-model.js';
import { getCardsBySetID, checkForSet, deleteCardsBySetID } from '../lib/set-service.js';
import { asyncHandler } from '../lib/utils.js';


// get sets
export const getSets = asyncHandler(
  async (req, res, next) => {
    const { userId } = req.params;
    let rows;

    // check for userId
    if (!userId) {
      const err = new Error('The userId is required in the URL. /userId');
      err.status = 400;
      return next(err);
    }

    // get sets
    rows = await Sets.findAll({
      raw: true,
      where: { user_id: userId },
    });
    
    console.log('getSets: ', rows.length);
    
    // get cards for each set
    // const setCardCount = [];
    
    for (const [index, set] of rows.entries()) {
      const { cardCount } = await getCardsBySetID(set.ID, userId);
      // setCardCount.push({setID: set.ID, cardCount});
      rows[index].cardCount = cardCount;
    }

    console.log('getSets: ', rows);
    res.status(200).json({
      message: 'success',
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
    const setData = {
      title: req.body.title,
      description: req.body.desc || undefined,
    };

    const setID = req.params.setID;

    if (setData.title) {
      const set = await Sets.update(setData, {
        where: {
          ID: setID,
        },
      });
      res.status(200).json({
        msg: 'Set updated!',
        set: set,

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
    const { userId, title, desc } = req.body;
    const setData = {
      title: title,
      description: desc || undefined,
      user_id: userId,
    };

    if (setData.title) {
      const set = await Sets.create(setData);
      res.status(200).json({
        msg: 'Set created!',
        set: set,
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
//     const { cards } = await getCardsBySetID(req.params.setID, req.session.userId);

//     res.render('set', { set, cards, userId: req.session.userId });
//   },
//   'Error retrieving set data: ',
//   500
// );


// get edit set
export const getEditSet = asyncHandler(
  async (req, res) => {
    const set = await Sets.findByPk(req.params.setID, {raw: true});
    res.status(200).json({
      set,
      msg: 'success',
    });
  },
  'Error retrieving  set data: ',
  500
);





// // delete set
// export const deleteSet = asyncHandler( 
//   async (req, res) => {

//     // get set
//     const set = await checkForSet(req.params.setID, req.session.userId);

//     if(set) {

//       // delete cards
//       await deleteCardsBySetID(req.params.setID, req.session.userId);

//       const { cards } = await getCardsBySetID(req.params.setID, req.session.userId);

//       // check if cards were deleted
//       if (cards.length === 0 || cards === undefined) {
//         // delete set
//         await Sets.destroy({
//           where: {ID: req.params.setID, user_id: req.session.userId}
//         });

//         console.log(`All cards were deleted for set ${req.params.setID} `);
//         console.log('Set ' + req.params.setID + ' is deleted');
//       } else {
//         const err = new Error(`Error deleting cards for set ${req.params.setID}`);
//         err.status = 500;
//         throw err;
//       }

//       res.redirect('/home/' + req.session.userId);
//     }
//   },
//   'Error deleting set: ',
//   500
// );