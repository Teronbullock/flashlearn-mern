import { Router } from 'express';
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
  getViewCards,
} from '../controllers/card-controller.js';

const router = Router();

// routes
router.get('/', getSets);
router.get('/user/:userId', getSets);
router.post('/user/:userId/add', postCreateSet);
router.get('/:setId/card/:cardId/edit', getEditCard);
router.put('/:setId/card/:cardId/edit', putEditCard);
router.delete('/:setId/card/:cardID/delete', deleteCard);
router.delete('/:setId/delete', deleteSet);
router.post('/:setId/card/add', postAddCard);
router.get('/:setId/cards', getViewCards);
router.put('/:setId/edit', putEditSet);
router.get('/:setId/edit', getEditSet);
router.get('/:setId', getCardsAllCards);

export default router;
