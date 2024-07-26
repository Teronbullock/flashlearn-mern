import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import RefreshTokens from '../models/refresh-token-model.js';

dotenv.config();

/**
 *  -- Async Handler --
 * This function will handle async errors via the try catch block
 * and pass them to the error handling middleware.
 *
 * The CB is ran asynchronously, if there is an error it will
 * be passed to the error handling middleware, otherwise the
 * callback will be called.
 *
 * @param {*} cb - The callback function to call.
 * @param {*} errMsg - The error message to display.
 * @param {*} errStatus - The error status to display.
 * @returns
 */
export const asyncHandler = (cb, errMsg, errStatus) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      
      if (errMsg) {
        error.message = errMsg + error.message;
      }

      // Set the error status
      error.status = error.status || errStatus;
      next(error);
    }
  };
};

/**
 * The genAuthToken function will create a token for the user.
 *
 * param {*} userId - The user ID.
 * param {*} userName - The user name.
 *
 * @returns - The token. or an error.
 */
export const genAuthToken = (userId, userName) => {
  let token;

  try {
    token = jwt.sign(
      {
        userId: userId,
        userName: userName,
      },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    return token;
  } catch (error) {
    throw new Error('Error creating token: ', error);
  }
};

/**
 *  -- Generate Refresh Token --
 * @param {string} userId 
 * @returns - The refresh token.
 */
export const genRefreshToken = userId => {
  try {
    const token = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    });

    return token;
  } catch (error) {
    throw new Error('Error creating refresh token:', error);
  }
};

/**
 * -- Set Refresh Token Cookie --
 * @param {*} res - The response object.
 * @param {*} refreshToken - The refresh token.
 */
export const setRefreshTokenCookie = (res, refreshToken) => {
  // Store refresh token securely (e.g., HTTP-only cookie)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
  });

};

/**
 * -- Verify Token --
 * @param {*} token 
 * @param {*} secret - The secret key.
 * @returns 
 */
export const verifyToken = (token, secret) => { 
  // Verify the refresh token
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Error verifying token: ', {cause: error});
  }
};

/**
 * -- Add Refresh Token --
 * @param {*} userId 
 * @param {*} refreshToken 
 */
export const addRefreshToken = async (userId, refreshToken) => {
  try {
    await RefreshTokens.create({
      user_id: userId,
      token: refreshToken,
    });
  } catch (error) {
    console.log('Error adding refresh token: ', error);
  }
};

/**
 * -- Delete Refresh Token --
 * @param {*} userId 
 * @returns 
 */
export const deleteRefreshToken = async userId => {
  const deletedCount = await RefreshTokens.destroy({
    where: { user_id: userId },
  });

  return deletedCount;
};