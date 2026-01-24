import { verifyToken } from '../services/token-service.js';

// check if the user is authenticated
const checkAuth = (req, res, next) => {  

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) { throw new Error('Not authenticated. Authorization header missing.');}
    
    const token = authHeader.split(' ')[1];
    
    if (token === undefined || token === null) {
      throw new Error('Not authenticated. Authorization token missing.');
    }

    const decodedToken = verifyToken(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;

    next();
  } catch (err) {
    console.error('decodedToken', err);
    res.status(401).json({ message: 'Not authorized'});
  }
};

export default checkAuth;
