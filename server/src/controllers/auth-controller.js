import { nanoid } from 'nanoid';
import { db } from '../db/database.js';
import { ZodError } from 'zod';
import { usersTable, authRegSchema, authLoginSchema } from '@flashlearn/schema-db';
import { authenticateUser } from '../services/auth-service.js';
import jwt from 'jsonwebtoken';
import {
  genAuthToken,
  genRefreshToken,
  setRefreshTokenCookie,
  storeRefreshToken,
  deleteRefreshToken,
} from '../services/token-service.js';
import { eq, is } from 'drizzle-orm';
import { ref } from 'process';
import { hashPassword } from '../lib/auth.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { AppError } from '../lib/AppError.js';


export const postUserRegister = asyncHandler(async (req, res) => {

    const validatedData = await authRegSchema.parseAsync({
      email: req.body.email,
      pass: req.body.pass,
      passConfirm: req.body.passConfirm,
    });

    if (!validatedData) {
      throw new APPError({message:'Validation failed'});
    }

    // check if user and email already exists
    const isUserEmail = await db.select().from(usersTable).where(eq(usersTable.email, validatedData.email));

    // if email exists, throw error
    if (isUserEmail && isUserEmail.length > 0) {
      throw new AppError({message:'Email already exists.'});
    }

    const hashedPass = await hashPassword(validatedData.pass);

    if (!hashedPass) {
      throw new AppError({message:'Error with registration ', cause: 'Error hashing password.', isOperational: false});
    }

    const formData = {
      pass: hashedPass,
      email: validatedData.email,
      slug: nanoid(10),
    };

    // create user
    await db.insert(usersTable).values(formData);
    console.log('User registered successfully.');

    // send res to client
    res.status(200).json({
      msg: 'User registered successfully.',
    });

}, 401);

export const postUserLogin = asyncHandler(async (req, res) => {
  const credentials = await authLoginSchema.parseAsync({
    email: req.body.email,
    pass: req.body.pass,
  });


  const user = await authenticateUser(credentials.email, credentials.pass);

  if (!user) {
    throw new AppError({message:'Invalid email or password.'});
  }

  const tokenData = genAuthToken(user.id);
  const refreshToken = genRefreshToken(user.id);

  const isRefreshTokenStored = await storeRefreshToken(user.id, refreshToken);

  if (!isRefreshTokenStored) {
    throw new AppError({message:'Error storing refresh token.'});
  }

  // set refresh token cookie
  setRefreshTokenCookie(res, refreshToken);

  res.status(200).json({
    msg: 'User logged in successfully.',
    token: tokenData.token,
    refreshToken,
  });

}, 401);

export const postUserLogout = asyncHandler(async (req, res) => {
  const token = jwt.verify(
    req.cookies.flashLearn_refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const userId = token.userId;

  // remove refresh token from database
  const deletedRefreshToken = await deleteRefreshToken(userId);

  if (deletedRefreshToken.length >= 1) {
    res.clearCookie('flashLearn_refreshToken');

    res.status(200).json({
      msg: 'User is logged out.',
    });
  } else {
    throw new Error('Error logging out: refresh token not found.');
  }
}, 400);

export const postRefresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.flashLearn_refreshToken;

  if (!refreshToken) {
    res.status(401);
    throw new Error('No refresh token found.');
  }

  const verifiedTokenData = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  if (!verifiedTokenData) {
    res.status(401);
    throw new Error('Invalid refresh token.');
  }

  const [verifiedUser] = await db.select().from(usersTable).where(eq(usersTable.id, verifiedTokenData.userId));

  if (!verifiedUser) {
    res.status(404);
    throw new Error('User not found.');
  }
  const tokenData = genAuthToken(verifiedUser.id);
  res.status(200).json({ token: tokenData.token });
}, 400);