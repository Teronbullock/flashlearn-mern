import { verifyToken } from '../lib/utils.js';
import dotenv from 'dotenv';
import path from 'path';

const isNetlify = process.env.NETLIFY === 'true';
const isNetlifyDev = process.env.NETLIFY_DEV === 'true';

if (isNetlify || isNetlifyDev) {
  dotenv.config();
} else {
  const __dirname = process.cwd();
  const envPath = path.resolve(__dirname, '../.env');
  dotenv.config({ path: envPath });  
}

// check if the user is authenticated
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
    console.log('decodedToken Bad', error);
    // return next(error);
    res.status(401).json({ message: 'Not authorized'});
  }
};

export default checkAuth;
