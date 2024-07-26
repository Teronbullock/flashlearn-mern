import { verifyToken } from '../lib/utils.js';
import dotenv from 'dotenv';

dotenv.config();

const checkAuth = (req, res, next) => {  
  try {
    const authHeader = req.headers.authorization;
    let token = null;
    
    if (authHeader) {
      token = authHeader.split(' ')[1];
    }
  
    if (token === undefined || token === null) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
    }
    const decodedToken = verifyToken(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId };

    next();
  } catch (error) {
    return next(error);
  }
};

export default checkAuth;
