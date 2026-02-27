import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/request.type';
import { TokenType } from '../types/token.type';
import jwt from 'jsonwebtoken';




// check if the user is authenticated
const checkAuth = (req: AuthRequest, res: Response, next: NextFunction) => {

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) { throw new Error('MISSING_HEADER'); }
    const token = authHeader.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || '') as unknown as TokenType;

    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    console.error('Unexpected Auth Error:', err);

    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: 'Invalid or expired token'
      });
    }

    if (err instanceof Error && err.message === 'MISSING_HEADER') {
      return res.status(400).json({
        message: 'Authorization header required'
      });
    }

    res.status(500).json({
      message: 'Internal server error'
    });
  }
};

export default checkAuth;
