import jwt from 'jsonwebtoken';

/**
 *  Function to handle async errors.
 *  This function will handle async errors and pass them to the
 *  error handling middleware.
 *  If there is no error the callback will be called.
 * 
 * @param {*} cb - The callback function to call.
 * @param {*} errMsg - The error message to display.
 * @param {*} errStatus - The error status to display.
 * @returns 
 */
export const asyncHandler = (cb, errMsg, errStatus ) => {
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
 * The authToken function will create a token for the user.
 * 
 * param {*} userID - The user ID.
 * param {*} userName - The user name.
 * 
 * @returns - The token. or an error.
 */
export const authToken = (userID, userName) => {
  let token;

  try {
    token = jwt.sign(
      {
        userID: userID,
        userName: userName,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    console.log('Token created: ', token);
    return token;

  } catch (error) {
    throw new Error('Error creating token: ', error);
  }
};