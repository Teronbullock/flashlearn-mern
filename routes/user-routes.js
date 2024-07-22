import { Router } from 'express';
import { body } from 'express-validator';
import { genAuthToken } from '../lib/utils.js';

const router = Router();

// const { 
//   midCheckUsersAuth,
//   midCheckUserAuthRedirect
//  } = require('../middleware');

import { 
  postUserRegister,
  postUserLogin,
  postRefresh,
  postUserLogout,
  getUserProfile,
  putEditProfile
} from '../controllers/user-controller.js';

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
 * -- refresh token --
 */
router.post('/refresh', postRefresh);


// router.get('/home/:userId', midCheckUsersAuth, midCheckUserAuthRedirect, getSets);
// router.get('/profile/:userId', midCheckUsersAuth, midCheckUserAuthRedirect, getUserProfile);
// router.put('/profile/:userId', midCheckUsersAuth, midCheckUserAuthRedirect, putEditProfile);

export default router;