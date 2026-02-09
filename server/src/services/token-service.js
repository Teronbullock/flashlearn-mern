import jwt from 'jsonwebtoken';
import { db } from '../db/database';
import { schemaDb } from '@flashlearn/schema-db';
import { eq } from 'drizzle-orm';


const { refreshTokens } = schemaDb;


/**
 * The genAuthToken function will create a token for the user.
 *
 * param {*} userId - The user ID.
 *
 * @returns - The token. or an error.
 */
export const genAuthToken = (userId) => {
  const token = jwt.sign(
    {
      userId: userId,
    },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  // sets the token expiration time to 15 minutes
  const tokenExpTime = new Date(new Date().getTime() + 1000 * 60 * 15);
  return {token, tokenExpTime};
};

/**
 *  -- Generate Refresh Token --
 * @param {string} userId
 * @returns - The refresh token.
 */
export const genRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

/**
 * -- Set Refresh Token Cookie --
 * @param {*} res - The response object.
 * @param {*} refreshToken - The refresh token.
 */
export const setRefreshTokenCookie = (res, refreshToken) => {
  // Store refresh token securely (e.g., HTTP-only cookie)
  res.cookie('flashLearn_refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
  });
};


/**
 * -- Store Refresh Token --
 * @param {*} userId
 * @param {*} refreshToken
 */
export const storeRefreshToken = async (userId, refreshToken) => {
  return await db.insert(refreshTokens).values({
    userId,
    token: refreshToken,
  }).returning();
};

/**
 * -- Delete Refresh Token --
 * @param {*} userId
 * @returns
 */
export const deleteRefreshToken = async (userId) => {
  const deletedCount = await db.delete(refreshTokens)
  .where(eq(refreshTokens.userId, userId))
  .returning();

  return deletedCount;
};
