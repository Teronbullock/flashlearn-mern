import { Router } from 'express';
import cardRoutes from './card-routes.js';
import { getAllSets, getEditSet, putEditSet, postCreateSet, deleteSet } from '../controllers/set-controller.js';

const router = Router();

// cards routes
router.use('/:setId/cards', cardRoutes);

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
