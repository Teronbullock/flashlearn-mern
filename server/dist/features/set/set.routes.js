import { Router } from 'express';
import { getAllSets, getEditSet, putEditSet, postCreateSet, deleteSet } from './set.controller.js';
const router = Router();
// for single set
router.route('/:setId')
    .get(getEditSet)
    .put(putEditSet)
    .delete(deleteSet);
// for set list
router.route('/')
    .get(getAllSets)
    .post(postCreateSet);
export default router;
//# sourceMappingURL=set.routes.js.map