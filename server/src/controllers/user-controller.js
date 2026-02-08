import { nanoid } from 'nanoid';
import Users from '../models/users-model.js';
import { ZodError } from 'zod';
import { AuthRegSchema, AuthLoginSchema } from '@flashlearn/schema-zod';

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
  try {
    const authRes = await AuthRegSchema.parseAsync(req.body);
    
    const { userEmail: user_email, userPass: user_pass } = authRes;

    const formData = {
      user_pass,
      user_email,
      slug: nanoid(10),
    };

    // check if user and email already exists
    const isUserEmail = await Users.findOne({ where: { user_email } });
  
    // if email exists, throw error
    if (isUserEmail) {
      throw new Error('Email already exists.');
    }

    // create user
    await Users.create(formData);
    console.log('User registered successfully.');

    // send res to client
    res.status(200).json({
      msg: 'User registered successfully.',
    });
  } catch (err) {
    if (err instanceof ZodError) {
      const errorMessage = err.errors.map((e) => e.message).join(' ');
      throw new Error(`Validation Error: ${errorMessage}`);
    }
    const error = new Error(err.message || "Couldn't register user.");
    error.cause = err;

    throw error;
  }
};

export const postUserLogin = async (req, res) => {
  const { user_email, user_pass } = req.body;

  try {
    const results = AuthLoginSchema.parse({
      userEmail: user_email,
      userPass: user_pass,
    });
    
  const { userEmail: parsedUserEmail, userPass: parsedUserPass } = results;
  
  const user = await authenticateUser(parsedUserEmail, parsedUserPass);
  const { id, slug } = user;
  
  // create a token
  const tokenData = genAuthToken(id, parsedUserEmail);
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
 
    if (error instanceof ZodError) {
        const errorMessage = error.errors.map((e) => e.message).join(' ');
        throw new Error(`Validation Error: ${errorMessage}`);
    } else {
      const errorMsg = error instanceof Error ? error.message : "Login Error";
      throw new Error(errorMsg);
    }
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