import { Router } from 'express';
const router = Router();

import { midCheckUsersAuth } from '../middleware/index.js';
import { getCardsBySetID } from '../lib/set-service.js';

import { 
  getSets,
  getEditSet,
  putEditSet,
  postCreateSet,
  deleteSet,
} from '../controllers/set-controller.js';

import { 
  getCardsAllCards,
  getEditCard,
  putEditCard,
  postAddCard,
  deleteCard,
 } from '../controllers/card-controller.js';


// routes
router.get('/', getSets);
router.get('/user/:userId', getSets);
router.post('/user/:userId/add', postCreateSet);
router.get('/:setId/card/:cardId/edit', getEditCard);
router.put('/:setId/card/:cardId/edit', putEditCard);
router.get('/:setID/edit', getEditSet);
router.put('/:setID/edit', putEditSet);
router.delete('/:setId/delete', deleteSet);
router.post('/:setId/card/add', postAddCard);
router.delete('/:setId/card/:cardID/delete', deleteCard);
router.get('/:setId', getCardsAllCards);
// router.get('/set/:setID', midCheckUsersAuth, getSet);




// card routes

// router.post('/set/:setID/card/add', midCheckUsersAuth, postAddCard);
// router.put('/set/:setID/card/:cardID/edit', midCheckUsersAuth, putEditCard);

// // cards route
// router.get('/set/:setID/cards', midCheckUsersAuth, getViewCards);

export default router;