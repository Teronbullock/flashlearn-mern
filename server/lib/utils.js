import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

/**
 *  -- Async Handler --
 *  This function will handle async errors and pass them to the
 *  error handling middleware.
 *
 *  The CB is ran asynchronously, if there is an error it will
 *  be passed to the error handling middleware, otherwise the
 *  callback will be called.
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

      if (errStatus) {
        error.status = errStatus;
      }

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

export const setRefreshTokenCookie = (res, refreshToken) => {
  // Store refresh token securely (e.g., HTTP-only cookie)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
  });

};

export const verifyToken = (token, secret) => {

  // Verify the refresh token
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Error verifying token: ', error);
  }
};
