import { Router } from 'express';
const router = Router();

import { midCheckUsersAuth } from '../middleware/index.js';

import { 
  getSets,
  getEditSet,
  putEditSet,
  postCreateSet,
} from '../controllers/set-controller.js';

import { 
  getCardsAllCards,
  getEditCard,
  putEditCard,
 } from '../controllers/card-controller.js';
import { getCardsBySetID } from '../lib/set-service.js';


// routes
router.get('/', getSets);
router.get('/user/:userId', getSets);
router.post('/user/:userId/create', postCreateSet);
router.get('/:setId/card/:cardId/edit', getEditCard);
router.put('/:setId/card/:cardId/edit', putEditCard);
router.get('/:setID/edit', getEditSet);
router.put('/:setID/edit', putEditSet);
// router.delete('/:setId/delete', deleteSet);
router.get('/:setId', getCardsAllCards);
// router.get('/set/:setID', midCheckUsersAuth, getSet);




// card routes

// router.get('/set/:setID/card/add', midCheckUsersAuth, getAddCard);
// router.post('/set/:setID/card/add', midCheckUsersAuth, postAddCard);
// router.put('/set/:setID/card/:cardID/edit', midCheckUsersAuth, putEditCard);
// router.delete('/set/:setID/card/:cardID/delete', midCheckUsersAuth, deleteCard);

// // cards route
// router.get('/set/:setID/cards', midCheckUsersAuth, getViewCards);

export default router;