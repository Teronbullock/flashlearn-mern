// card routes /:setId/cards/...
import { Router } from 'express';
import { getCards, getEditCard, putEditCard, addCard, putDeleteCard, viewCards, } from './card.controller.js';
const router = Router({ mergeParams: true });
//views cards
router.get('/view', viewCards);
// for single cards
router.route('/:cardId')
    .get(getEditCard)
    .put(putEditCard)
    .delete(putDeleteCard);
// for card list
router.route('/')
    .post(addCard)
    .get(getCards);
export default router;
//# sourceMappingURL=card.routes.js.map