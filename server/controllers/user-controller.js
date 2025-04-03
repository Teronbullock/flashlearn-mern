import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import Users from '../models/users-model.js';

import {
  genAuthToken,
  genRefreshToken,
  setRefreshTokenCookie,
  verifyToken,
  addRefreshToken,
  deleteRefreshToken,
} from '../services/token-service.js';

import authenticateUser from '../services/auth-service.js';

/**
 * post user register
 */
export const postUserRegister = async (req, res) => {
  let valErrs = validationResult(req);
  
  // check if all fields are filled
  if (!valErrs.isEmpty()) {
    throw new Error('All fields required. ' + valErrs.array()[0].msg);
  }

  // get form fields
  const {user_pass, user_pass_confirm, user_name, user_email } = req.body;
    
  const formData = {
    user_name,
    user_email,
    user_pass,
    slug: nanoid(10),
  };
  
  // confirm that user typed same password twice
  if (user_pass !== user_pass_confirm) {
    throw new Error('Passwords do not match.');
  }
  
  // check if user and email already exists
  const isUser = await Users.findOne({ where: { user_name } });
  const isUserEmail = await Users.findOne({ where: { user_email } });
  
  // if user exists, throw error
  if (isUser) {
    throw new Error('User already exists.');
  }
  
  // if email exists, throw error
  if (isUserEmail) {
    throw new Error('Email already exists.');
  }
  
  // create user
  try {

    // await Users.create(formData);
    console.log('User registered successfully.');
    // send res to client
    res.status(200).json({
      msg: 'User registered successfully.',
    });
  } catch (err) {
    const error = new Error("Couldn't register user.");
    error.cause = err;

    throw error;
  }
};

/**
 * post user login
 */
export const postUserLogin = async (req, res) => {
  let errors = validationResult(req);
  const { user_pass, user_email } = req.body;

  if (!errors.isEmpty()) {
    throw new Error('Email and password are required.');
  }

  const user = await authenticateUser(user_email, user_pass);
  const { id, slug } = user;

  try {
    // create a token
    const token = genAuthToken(id, user_email);
    // create a refresh token
    const refreshToken = genRefreshToken(id);
    // add refresh token to database
    addRefreshToken(id, refreshToken);
    // set refresh token cookie
    setRefreshTokenCookie(res, refreshToken);

    res.status(200).json({
      msg: 'User logged in successfully.',
      token,
      refreshToken,
      userId: id,
      userEmail: user_email,
      userSlug: slug,
    });
  } catch (error) {
    console.error('Login Error: ', error);
    throw new Error('Invalid credentials');
  }
};

/**
 * -- get user profile --
 */
export const getUserProfile = async (req, res) => {
  const { slug } = req.params;
  const user = await Users.findOne({ where: {slug}});
  
  const { user_name, user_email } = user;

  return res.status(200).json({
    user_name,
    user_email,
  });
};

/**
 * -- put user profile --
 */
export const putEditProfile = async (req, res) => {
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new Error('All fields required.');
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
    throw new Error('Old password is incorrect.');
  }

  // confirm that password and confirm password match
  if (user_pass !== user_pass_confirm) {
    throw new Error('Passwords do not match.');
  }

  // update user data
  const updatedUser = await Users.update(formData, {
    where: { id: userId },
    raw: true,
    individualHooks: true,
  });

  // check if user was updated
  if (updatedUser[0] === 0) {
    throw new Error('User not found.');
  } else {
    res.status(200).json({
      msg: 'User updated successfully.',
    });
  }
};

/**
 * -- refresh token --
 */
export const postRefresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  let tokenData;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  tokenData = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

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
      userSlug: user.slug,
    });
  }
};

/**
 *  -- post user logout --
 */
export const postUserLogout = async (req, res) => {
  const token = verifyToken(
    req.cookies.refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const userId = token.userId;

  // remove refresh token from database
  const deletedRefreshToken = await deleteRefreshToken(userId);

  if (deletedRefreshToken >= 1) {
    res.clearCookie('refreshToken');

    res.status(200).json({
      msg: 'User is logged out.',
    });
  } else {
    throw new Error('Error logging out: refresh token not found.');
  }
};