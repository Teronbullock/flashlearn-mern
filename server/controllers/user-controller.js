import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Users from '../models/users-model.js';
import {
  asyncHandler,
  genAuthToken,
  genRefreshToken,
  setRefreshTokenCookie,
  verifyToken,
  addRefreshToken,
  deleteRefreshToken
} from '../lib/utils.js';

dotenv.config();


/**
 * post user register
 */
export const postUserRegister = asyncHandler(async (req, res, next) => {
  let errors = validationResult(req);

  // check if all fields are filled
  if (!errors.isEmpty()) {
    let err = new Error('All fields required.');
    throw err;
  }

  const { user_name, user_email, user_pass, user_pass_confirm } = req.body;

  const formData = {
    user_name,
    user_email,
    user_pass,
  };

  // confirm that user typed same password twice
  if (user_pass !== user_pass_confirm) {
    let err = new Error('Passwords do not match.');
    throw err;
  }

  // check if user and email already exists
  const isUser = await Users.findOne({ where: { user_name } });
  const isUserEmail = await Users.findOne({ where: { user_email } });

  if (isUser) {
    let err = new Error('User already exists.');
    throw err;
  }

  if (isUserEmail) {
    let err = new Error('Email already exists.');
    throw err;
  }

  try {
    // use schema method to insert document into PSQL
    await Users.create(formData);

    res.status(200).json({
      msg: 'User registered successfully.',
    });
  } catch (error) {
    let err = new Error('Error registering user.');
    throw err; 
  }
}, null, 400);

/**
 * post user login
 */
export const postUserLogin = asyncHandler(
  async (req, res, next) => {
    let errors = validationResult(req);
    const { user_name, user_pass } = req.body;

    if (!errors.isEmpty()) {
      let err = new Error('Email and password are required.');
      err.status = 401;
      return next(err);
    }

    Users.authenticate(user_name, user_pass, (error, user) => {
      if (error || !user) {
        const err = new Error('Wrong username or password.');
        err.status = 401;
        return next(err);
      }

      const { id, user_name } = user;

      // create a token
      try {
        let token = genAuthToken(id, user_name);
        let refreshToken = genRefreshToken(id);

        // add refresh token to database
        addRefreshToken(id, refreshToken);

        // set refresh token cookie
        setRefreshTokenCookie(res, refreshToken);

        res.status(200).json({
          msg: 'User logged in successfully.',
          token,
          refreshToken,
          userId: id,
          userName: user_name,
        });
      } catch (error) {
        return next(error);
      }
    });
  },
  'Error logging in: ',
  401
);

/**
 * -- get user profile --
 */
export const getUserProfile = asyncHandler(
  async (req, res ) => {  
    const { userId } = req.params;
    
    const user = await Users.findByPk(userId);
    const { user_name, user_email } = user;

    return res.status(200).json({
      user_name,
      user_email,
    });
  },
  'Error retrieving user data: '
);

/**
 * -- put user profile --
 */
export const putEditProfile = asyncHandler(
  async (req, res, next) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      let err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }

    const { user_email, user_old_pass, user_pass, user_pass_confirm } = req.body;
    const userId = req.params.userId;
  
    // add user data to formData
    const formData = {
      user_email,
      user_pass,
    };

    // check if user exists
    const user = await Users.findOne({ where: { id: userId } }, { raw: true });

    // check old password match
    const isOldPassMatch = await bcrypt.compare(user_old_pass, user.user_pass);

    if (!isOldPassMatch) {
      const err = new Error('Old password is incorrect.');
      err.status = 400;
      return next(err);
    }

    // confirm that password and confirm password match
    if (user_pass !== user_pass_confirm) {
      const err = new Error('Passwords do not match.');
      err.status = 400;
      return next(err);
    }

    // update user data
    const updatedUser = await Users.update(formData, {
      where: { id: userId },
      raw: true,
      individualHooks: true,
    });

    // check if user was updated
    if (updatedUser[0] === 0) {
      const err = new Error('User not found.');
      err.status = 400;
      return next(err);
    } else {
      res.status(200).json({
        msg: 'User updated successfully.',
      });
    }
  },
  'Error updating user data: ',
);

/**
 * -- refresh token --
 */
export const postRefresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  let tokenData;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    tokenData = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (tokenData) {
      const user = await Users.findByPk(tokenData.userId);

      if (!user) {
        res.status(404);
        throw new Error('User not found');
      }
      // Generate a new access token
      const token = genAuthToken(user.id, user.user_name);

      return res.status(200).json({
        token,
        userId: user.id,

      });
    }

  } catch (error) {
    console.log('Error refreshing token: ', error);
    return res.json({
      message: error.message,
    });
  }
};

/**
 *  -- post user logout --
 */
export const postUserLogout = async (req, res) => {
  const token = verifyToken(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET);

  const userId = token.userId;

  // remove refresh token from database
  try {
    const deletedRefreshToken = await deleteRefreshToken(userId);
 
    if (deletedRefreshToken >= 1) {
      res.clearCookie('refreshToken');
      
      res.status(200).json({ 
        msg: 'User is logged out.'
      });
    } else {
      throw new Error('Error logging out: refresh token not found.');
    }

  } catch (error) {
    console.log('Error logging out: ', error);
    res.status(500).json({
      msg: 'Error logging out: ' + error.message
    });
  }
}