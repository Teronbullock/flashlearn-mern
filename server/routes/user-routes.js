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
    body('user_pass_confirm')
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
 * -- Edit Profile --
 */
router.get('/:userId/profile', checkAuth, getUserProfile);
router.put('/:userId/profile', checkAuth,[
  body('user_email')
  .isEmail()
  .not()
  .isEmpty(),
  body('user_old_pass')
  .not()
  .isEmpty(),
  body('user_pass')
  .not()
  .isEmpty(),
  body('user_pass_confirm')
  .not()
  .isEmpty()
], putEditProfile);

/**
 * -- refresh token --
 */
router.post('/refresh', postRefresh);

router.get('/', (req, res) => {
  res.send('Welcome to the User API');
});

// handle 404
router.use('*', (req, res, next) => {
  return next();
});

export default router;