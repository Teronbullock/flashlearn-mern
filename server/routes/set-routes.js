import { Router } from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import { body, param } from 'express-validator';
import getUserId from '../middleware/getUserId.js';

import { getSets, getEditSet, putEditSet, postCreateSet, deleteSet } from '../controllers/set-controller.js';

import {
  getCardsAllCards,
  getEditCard,
  putEditCard,
  postAddCard,
  deleteCard,
  getViewCards,
} from '../controllers/card-controller.js';

const router = Router();

// set routes
router.get('/user/:userSlug', getUserId, asyncHandler(getSets, 400));
router.post('/user/:userSlug/add', [body('title').notEmpty()], getUserId, asyncHandler(postCreateSet, 422));
router.get('/user/:userSlug/:setId/edit', getUserId, asyncHandler(getEditSet));
router.put('/user/:userSlug/:setId/edit', [body('title').notEmpty()], getUserId, asyncHandler(putEditSet));
router.delete('/user/:userSlug/:setId/delete', getUserId, asyncHandler(deleteSet, 403));

// card routes
router.get('/:setId/cards', asyncHandler(getViewCards));
router.post('/:setId/card/add', [body('term').notEmpty()], asyncHandler(postAddCard, 422));
router.get('/:setId/card/:cardId/edit', asyncHandler(getEditCard));
router.put('/:setId/card/:cardId/edit', asyncHandler(putEditCard, 422));
router.delete('/:setId/card/:cardId/delete', asyncHandler(deleteCard));
router.get('/:setId', asyncHandler(getCardsAllCards));

// handle 404
router.use('*', (req, res, next) => {
  return next();
});
export default router;
