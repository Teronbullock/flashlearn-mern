import { Router } from 'express';
import {
  getCardsAllCards,
  getEditCard,
  putEditCard,
  postAddCard,
  deleteCard,
  getViewCards,
} from '../controllers/card-controller.js';

const router = Router({ mergeParams: true });

//views cards
router.get('/view', getViewCards);

// for single cards
router.route('/:cardId')
.get(getEditCard)
.put(putEditCard)
.delete(deleteCard);

// for card list
router.route('/')
.post(postAddCard)
.get(getCardsAllCards);

export default router;