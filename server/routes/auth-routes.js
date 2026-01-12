import { Router } from 'express';
import { body } from 'express-validator';
import asyncHandler from '../middleware/asyncHandler.js';

import {
  postUserRegister,
  postUserLogin,
  postRefresh,
  postUserLogout,
} from '../controllers/user-controller.js';

const router = Router();

/**
 * -- User Registration --
 */
router.post(
  '/register',
  [
    body('user_email')
      .trim()
      .isEmail()
      .withMessage('Invalid email format.')
      .notEmpty()
      .withMessage('Email is required.')
      .normalizeEmail(),
    body('user_pass').notEmpty(),
    body('user_pass_confirm').notEmpty(),
  ],
  asyncHandler(postUserRegister, 401)
);

/**
 * -- User Login --
 */
router.post(
  '/login',
  [
    body('user_email')
      .trim()
      .isEmail()
      .withMessage('Invalid email format.')
      .notEmpty()
      .withMessage('Email is required.')
      .normalizeEmail(),
    body('user_pass').notEmpty(),
  ],
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
