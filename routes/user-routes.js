import { Router } from 'express';
import { body } from 'express-validator';
import checkAuth from '../middleware/check-auth.js';

import { 
  postUserRegister,
  postUserLogin,
  postRefresh,
  postUserLogout,
  getUserProfile,
  putEditProfile
} from '../controllers/user-controller.js';


const router = Router();

/**
 * -- User Registration --
 */
router.post(
  '/register',
  [
    body('user_name')
    .not()
    .isEmpty(),
    body('user_email')
    .isEmail()
    .not()
    .isEmpty(),
    body('user_pass')
    .not()
    .isEmpty(),
    body('user_confirm_pass')
    .not()
    .isEmpty()
  ],
  postUserRegister
);


/**
 * -- User Login --
 */
router.post('/login',
  [
    body('user_name')
    .not()
    .isEmpty(),
    body('user_pass')
    .not()
    .isEmpty()
  ],
  postUserLogin
);

router.post('/logout', postUserLogout);


/**
 * -- refresh token --
 */
router.post('/refresh', postRefresh);

export default router;