import { Router } from 'express';
const router = Router();

import { midCheckUsersAuth } from '../middleware/index.js';

import { getSets } from '../controllers/set-controller.js';

import { getAddCard } from '../controllers/card-controller.js';


// set routes
router.get('/', getSets);
router.get('/:userId', getSets);
// router.get('/set/:setID', midCheckUsersAuth, getSet);
// router.post('/set/create', midCheckUsersAuth, postCreateSet);
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