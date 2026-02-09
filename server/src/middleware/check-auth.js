import jwt from 'jsonwebtoken';

// check if the user is authenticated
const checkAuth = (req, res, next) => {

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) { throw new Error('MISSING_HEADER'); }
    const token = authHeader.split(' ')[1];
  
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    // Check if the error came from the JWT library
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: 'Invalid or expired token'
      });
    }

    // Handle your custom manual errors
    if (err.message === 'MISSING_HEADER') {
      return res.status(400).json({
        message: 'Authorization header required'
      });
    }

    // Fallback for everything else (500)
    console.error('Unexpected Auth Error:', err);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
};

export default checkAuth;
