import { validationResult } from 'express-validator';
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

import {authenticateUser} from '../services/auth-service.js';


export const postUserRegister = async (req, res) => {
  let valErrs = validationResult(req);

  // check if all fields are filled
  if (!valErrs.isEmpty()) {
    throw new Error('All fields required. ' + valErrs.array()[0].msg);
  }

  // get form fields
  const { user_pass, user_pass_confirm, user_email } = req.body;

  const formData = {
    user_email,
    user_pass,
    slug: nanoid(10),
  };

  // confirm that user typed same password twice
  if (user_pass !== user_pass_confirm) {
    throw new Error('Passwords do not match.');
  }

  // check if user and email already exists
  const isUserEmail = await Users.findOne({ where: { user_email } });

  // if email exists, throw error
  if (isUserEmail) {
    throw new Error('Email already exists.');
  }

  // create user
  try {
    await Users.create(formData);
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
    const tokenData = genAuthToken(id, user_email);
    // create a refresh token
    const refreshToken = genRefreshToken(id);
    // add refresh token to database
    addRefreshToken(id, refreshToken);
    // set refresh token cookie
    setRefreshTokenCookie(res, refreshToken);

    res.status(200).json({
      msg: 'User logged in successfully.',
      token: tokenData.token,
      refreshToken,
    });
  } catch (error) {
    console.error('Login Error: ', error);
    throw new Error('Invalid credentials');
  }
};

export const postUserLogout = async (req, res) => {
  const token = verifyToken(
    req.cookies.flashLearn_refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const userId = token.userId;

  // remove refresh token from database
  const deletedRefreshToken = await deleteRefreshToken(userId);

  if (deletedRefreshToken >= 1) {
    res.clearCookie('flashLearn_refreshToken');

    res.status(200).json({
      msg: 'User is logged out.',
    });
  } else {
    throw new Error('Error logging out: refresh token not found.');
  }
};

export const postRefresh = async (req, res) => {
  const refreshToken = req.cookies.flashLearn_refreshToken;

  if (!refreshToken) {
    res.status(401);
    throw new Error('No refresh token found.');
  }

  const verifiedTokenData = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (!verifiedTokenData) {
    res.status(401);
    throw new Error('Invalid refresh token.');
  }

  const verifiedUser = await Users.findByPk(verifiedTokenData.userId);
  if (!verifiedUser) {
    res.status(404);
    throw new Error('User not found.');
  }

  const tokenData = genAuthToken(verifiedUser.id);
  res.status(200).json({ token: tokenData.token });
};