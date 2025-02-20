import jwt from 'jsonwebtoken';
import RefreshTokens from '../models/refresh-token-model.js';

/**
 * The genAuthToken function will create a token for the user.
 *
 * param {*} userId - The user ID.
 * param {*} userName - The user name.
 *
 * @returns - The token. or an error.
 */
export const genAuthToken = (userId, userName) => {
  return jwt.sign(
    {
      userId: userId,
      userName: userName,
    },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
};

/**
 *  -- Generate Refresh Token --
 * @param {string} userId
 * @returns - The refresh token.
 */
export const genRefreshToken = userId => {
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
  return jwt.verify(token, secret);
};

/**
 * -- Add Refresh Token --
 * @param {*} userId
 * @param {*} refreshToken
 */
export const addRefreshToken = async (userId, refreshToken) => {
  await RefreshTokens.create({
    user_id: userId,
    token: refreshToken,
  });
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
