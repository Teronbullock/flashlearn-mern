import { Router } from 'express';
import asyncHandler from '../middleware/asyncHandler.js';

import {
  postUserRegister,
  postUserLogin,
  postRefresh,
  postUserLogout,
} from '../controllers/auth-controller.js';

const router = Router();

/**
 * -- User Registration --
 */
router.post(
  '/register',
  asyncHandler(postUserRegister, 401)
);

/**
 * -- User Login --
 */
router.post(
  '/login',
  asyncHandler(postUserLogin, 401)
);

router.post('/logout', asyncHandler(postUserLogout, 400));


/**
 * -- refresh token --
 */
router.post('/refresh', asyncHandler(postRefresh, 400));

router.get('/', (req, res) => {
  res.send('Welcome to the User API');
});

// handle 404
router.use('*', (req, res, next) => {
  return next();
});

export default router;
