import { Router } from 'express';
const router = Router();

// const { 
//   midCheckUsersAuth,
//   midCheckUserAuthRedirect
//  } = require('../middleware');

// const {
//   getSets,
//   getCreateSet,
//   postCreateSet,
//   getSet,
//   getEditSet,
//   postEditSet,
//   deleteSet
// } = require('../controllers/set-controller');

// const {
//   getAddCard,
//   postAddCard,
//   getEditCard,
//   putEditCard,
//   deleteCard,
//   getViewCards
// } = require('../controllers/card-controller');


// set routes
// router.get('/create-set', midCheckUsersAuth, getCreateSet);
// router.post('/create-set', midCheckUsersAuth, postCreateSet);
// router.get('/set/:setID', midCheckUsersAuth, getSet);
// router.get('/set/:setID/edit', midCheckUsersAuth, getEditSet);
// router.post('/set/:setID/edit', midCheckUsersAuth, postEditSet);
// router.delete('/set/:setID/delete', midCheckUsersAuth, deleteSet);

// // card routes
// router.get('/set/:setID/card/add', midCheckUsersAuth, getAddCard);
// router.post('/set/:setID/card/add', midCheckUsersAuth, postAddCard);
// router.get('/set/:setID/card/:cardID/edit', midCheckUsersAuth, getEditCard);
// router.put('/set/:setID/card/:cardID/edit', midCheckUsersAuth, putEditCard);
// router.delete('/set/:setID/card/:cardID/delete', midCheckUsersAuth, deleteCard);

// // cards route
// router.get('/set/:setID/cards', midCheckUsersAuth, getViewCards);

export default router;