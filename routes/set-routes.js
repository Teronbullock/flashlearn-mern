import { Router } from 'express';
import { body } from 'express-validator';

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
router.post('/user/:userId/add', [
  body('title').notEmpty()
], postCreateSet);
router.delete('/user/:userId/:setId/delete', deleteSet);
router.get('/:setId/card/:cardId/edit', getEditCard);
router.put('/:setId/card/:cardId/edit', putEditCard);
router.delete('/:setId/card/:cardId/delete', deleteCard);
router.post('/:setId/card/add', postAddCard);
router.get('/:setId/cards', getViewCards);
router.put('/:setId/edit', putEditSet);
router.get('/:setId/edit', getEditSet);
router.get('/:setId', getCardsAllCards);

// handle 404
router.use('*', (req, res, next) => {
  return next();
});
export default router;
