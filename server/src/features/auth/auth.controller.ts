import { type Response, type Request } from "express";
import { nanoid } from 'nanoid';
import { comparePassword, hashPassword } from './auth.utils.js';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { AppError } from '../../lib/AppError.js';
import { authenticateUser } from "./auth.service.js";
import { type TokenType, type AuthRequest } from '../../types/index.js';
import {
  getUserByEmail,
  getUserById,
  getUserPasswordById,
  getUserEmailById,
  createUser,
  updateUser,
  deleteUser,
} from './auth.dal.js';

import {
  storeRefreshToken,
  deleteRefreshToken,

} from '../../dal/token.dal.js';

import {
  RegisterSchema,
  LoginSchema,
  UpdatePasswordSchema,
  PasswordSchema,
} from '@flashlearn/schema-db';

import {
  genAuthToken,
  genRefreshToken,
  verifyToken
} from '../../services/token-service.js';


export const register = asyncHandler(async (req, res) => {

  const credentials = await RegisterSchema.parseAsync({
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  if (!credentials) {
    throw new AppError({ message: 'Validation failed' });
  }

  // check if user and email already exists
  const isUserEmail = await getUserByEmail(credentials.email);


  // if email exists, throw error
  if (isUserEmail && isUserEmail.length > 0) {
    throw new AppError({ message: 'Email already exists.' });
  }

  const hashedPassword = await hashPassword(credentials.password);

  if (!hashedPassword) {
    throw new AppError({ message: 'Error with registration ', cause: 'Error hashing password.', isOperational: false });
  }

  const formData = {
    password: hashedPassword,
    email: credentials.email,
    slug: nanoid(10),
  };

  const [user] = await createUser(formData);


  if (!user) {
    throw new AppError({ message: 'Registration failed' })
  }

  const tokenData = genAuthToken(user.id, process.env.JWT_SECRET || '');
  const refreshToken = genRefreshToken(user.id, process.env.REFRESH_TOKEN_SECRET || '');

  if (!tokenData || !refreshToken) {
    throw new AppError({ message: 'Error generating tokens.' });
  }

  const isRefreshTokenStored = await storeRefreshToken(user.id, refreshToken);
  if (!isRefreshTokenStored) {
    throw new AppError({ message: 'Error storing refresh token.' });
  }

  res.cookie('flashLearn_refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  // send res to client
  res.status(200).json({
    msg: 'User registered successfully.',
    token: tokenData.token,
    refreshToken,
  });

}, 401);

export const login = asyncHandler(async (req: Request, res: Response) => {
  const credentials = await LoginSchema.parseAsync({
    email: req.body.email,
    password: req.body.password,
  });


  const user = await authenticateUser(credentials.email, credentials.password);

  if (!user) {
    throw new AppError({ message: 'Invalid email or password.' });
  }

  const tokenData = genAuthToken(user.id, process.env.JWT_SECRET || '');
  const refreshToken = genRefreshToken(user.id, process.env.REFRESH_TOKEN_SECRET || '');


  if (!tokenData || !refreshToken) {
    throw new AppError({ message: 'Error generating tokens.' });
  }

  const isRefreshTokenStored = await storeRefreshToken(user.id, refreshToken);

  if (!isRefreshTokenStored) {
    throw new AppError({ message: 'Error storing refresh token.' });
  }

  res.cookie('flashLearn_refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  res.status(200).json({
    msg: 'User logged in successfully.',
    token: tokenData.token,
    refreshToken,
  });

}, 401);

export const logout = asyncHandler(async (req: AuthRequest, res: Response) => {

  const token = verifyToken(
    req.cookies.flashLearn_refreshToken,
    process.env.REFRESH_TOKEN_SECRET || ''
  ) as unknown as TokenType;

  const userId = token.userId;

  // remove refresh token from database
  const deletedRefreshToken = await deleteRefreshToken(userId);

  if (deletedRefreshToken.length >= 1) {

    res.clearCookie('flashLearn_refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    res.status(200).json({
      msg: 'User is logged out.',
    });
  } else {
    throw new Error('Error logging out: refresh token not found.');
  }
}, 400);

export const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.flashLearn_refreshToken;

  if (!refreshToken) {
    res.status(401);
    throw new AppError({ message: 'No refresh token found.' });
  }

  const verifiedToken = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET || '') as unknown as TokenType;

  if (!verifiedToken) {
    res.status(401);
    throw new AppError({ message: 'Invalid refresh token.' });
  }

  const [verifiedUser] = await getUserById(verifiedToken.userId);


  if (!verifiedUser) {
    res.status(404);
    throw new AppError({ message: 'User not found.' });
  }
  const tokenData = genAuthToken(verifiedUser.id, process.env.JWT_SECRET || '');

  if (!tokenData) {
    throw new AppError({ message: 'Error generating tokens.' });
  }

  res.status(200).json({ token: tokenData.token });
}, 400);

export const deleteAccount = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    throw new AppError({ message: 'User credentials not found.' });
  }
  const credentials = PasswordSchema.parse({ password: req.body.password });

  const [user] = await getUserPasswordById(userId);

  if (!user) {
    throw new AppError({ message: 'User not found.' });
  }

  const isOldPasswordMatch = await comparePassword(credentials.password, user.password);
  if (!isOldPasswordMatch) {
    throw new AppError({ message: 'Invalid credentials.' });
  }

  const result = await deleteUser(userId);

  if (result.length === 0) {
    throw new AppError({ message: 'User not found.' });
  }

  res.clearCookie('flashLearn_refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  res.status(200).json({
    msg: 'User deleted successfully.',
  });

}, 400);

export const getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    throw new AppError({ message: 'User credentials not found.' });
  }

  const [user] = await getUserEmailById(userId);
  if (!user) {
    throw new AppError({ message: 'User not found.' });
  }

  return res.status(200).json({
    email: user.email,
  });
}, 400);

export const updateEmail = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    throw new AppError({ message: 'User credentials not found.' });
  }

  const credentials = LoginSchema.parse({ email: req.body.email, password: req.body.password });

  const [user] = await getUserPasswordById(userId);
  if (!user) {
    throw new AppError({ message: 'User not found.' });
  }

  const isOldPasswordMatch = await comparePassword(credentials.password, user.password);
  if (!isOldPasswordMatch) {
    throw new AppError({ message: 'invalid credentials.' });
  }

  const result = await updateUser(userId, { email: credentials.email });
  if (result.length === 0) {
    throw new AppError({ message: 'User not found.' });
  }

  res.status(200).json({
    msg: 'User updated successfully.',
  });

}, 400);

export const updatePassword = asyncHandler(async (req: AuthRequest, res: Response) => {

  const userId = req.userId;
  if (!userId) {
    throw new AppError({ message: 'User credentials not found.' });
  }

  const credentials = UpdatePasswordSchema.parse({
    oldPassword: req.body.oldPassword,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  // check if user exists
  const [user] = await getUserPasswordById(userId);
  if (!user) {
    throw new AppError({ message: 'User not found.' });
  }

  // check old password match
  const isOldPasswordMatch = await comparePassword(credentials.oldPassword, user.password);
  if (!isOldPasswordMatch) {
    throw new AppError({ message: 'Old password is incorrect.' });
  }

  const hashedPassword = await hashPassword(credentials.password, 12);

  const result = await updateUser(userId, { password: hashedPassword });

  // check if user was updated
  if (result.length === 0) {
    throw new AppError({ message: 'User not found.' });
  }

  res.status(200).json({
    msg: 'User updated successfully.',
  });

}, 400);