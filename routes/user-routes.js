import { Router } from 'express';
import { body } from 'express-validator';

const router = Router();

// const { 
//   midCheckUsersAuth,
//   midCheckUserAuthRedirect
//  } = require('../middleware');

import { 
  postUserRegister,
  postUserLogin,
  getUserProfile,
  putEditProfile
} from '../controllers/user-controller.js';


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

// router.get('/home/:userId', midCheckUsersAuth, midCheckUserAuthRedirect, getSets);
// router.get('/profile/:userId', midCheckUsersAuth, midCheckUserAuthRedirect, getUserProfile);
// router.put('/profile/:userId', midCheckUsersAuth, midCheckUserAuthRedirect, putEditProfile);

export default router;