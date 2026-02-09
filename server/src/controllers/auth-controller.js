import { nanoid } from 'nanoid';
import { db } from '../db/database.js';
import { ZodError } from 'zod';
import { schemaDb, schemaZod } from '@flashlearn/schema-db';
import {authenticateUser} from '../services/auth-service.js';
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

const { AuthRegSchema, AuthLoginSchema } = schemaZod;
const { users } = schemaDb;


export const postUserRegister = async (req, res) => {
  try {
    const authRes = await AuthRegSchema.parseAsync(req.body);
    const { email: email, pass: pass } = authRes;

    const formData = {
      pass,
      email,
      slug: nanoid(10),
    };

    // check if user and email already exists
    const isUserEmail = await db.select(users).where(eq(users.email, email));
  
    // if email exists, throw error
    if (isUserEmail) {
      throw new Error('Email already exists.');
    }

    // create user
    await db.insert(users).values(formData);
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
    console.error('Error registering user:', err);
    throw new Error('Error registering user.');
  }
};

export const postUserLogin = async (req, res) => {

  try {
    const credentials = AuthLoginSchema.parse({
      email: req.body.email,
      pass: req.body.pass,
    });
  
  const user = await authenticateUser(credentials.email, credentials.pass);
  
  const tokenData = genAuthToken(user.id);
  const refreshToken = genRefreshToken(user.id);
  
  const isRefreshTokenStored = await storeRefreshToken(user.id, refreshToken);
  if (!isRefreshTokenStored) {
    throw new Error('Error storing refresh token.');
  }

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
};

export const postRefresh = async (req, res) => {
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

  const [verifiedUser] = await db.select().from(users).where(eq(users.id, verifiedTokenData.userId));

  if (!verifiedUser) {
    res.status(404);
    throw new Error('User not found.');
  }
  const tokenData = genAuthToken(verifiedUser.id);
  res.status(200).json({ token: tokenData.token });
};