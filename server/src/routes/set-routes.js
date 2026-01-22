import { Router } from 'express';
import { body, param } from 'express-validator';
import asyncHandler from '../middleware/asyncHandler.js';


import { getAllSets, getEditSet, putEditSet, postCreateSet, deleteSet } from '../controllers/set-controller.js';

import {
  getCardsAllCards,
  getEditCard,
  putEditCard,
  postAddCard,
  deleteCard,
  getViewCards,
} from '../controllers/card-controller.js';

const router = Router();

// --- set cards routes

//views cards
router.get('/:setId/cards/view', asyncHandler(getViewCards));

// for single cards
router.get('/:setId/cards/:cardId', asyncHandler(getEditCard));
router.put('/:setId/cards/:cardId', asyncHandler(putEditCard, 422));
router.delete('/:setId/cards/:cardId', asyncHandler(deleteCard));
router.post('/:setId/cards', [body('term').notEmpty()], asyncHandler(postAddCard, 422));

// get cards list
router.get('/:setId/cards', asyncHandler(getCardsAllCards));

// --- set routes
// for single set
router.get('/:setId', asyncHandler(getEditSet));
router.put('/:setId', [body('title').notEmpty()], asyncHandler(putEditSet));
router.delete('/:setId', asyncHandler(deleteSet, 403));
router.post('/', [body('title').notEmpty()], asyncHandler(postCreateSet, 422));

// get set list
router.get('/', asyncHandler(getAllSets, 400));

// --- handle 404
router.use('*', (req, res, next) => {
  return next();
});
export default router;
