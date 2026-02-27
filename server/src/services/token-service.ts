import jwt from 'jsonwebtoken';
import { AppError } from '../lib/AppError';


export const genAuthToken = (userId: string, secret: string) => {
  try {
    const token = jwt.sign({ userId },
      secret,
      { expiresIn: '15m' }
    );

    // sets the token expiration time to 15 minutes
    const tokenExpTime = new Date(new Date().getTime() + 1000 * 60 * 15);
    return { token, tokenExpTime };
  } catch (err) {
    if (err instanceof Error) {
      throw new AppError({ message: err.message });
    }
  }
};

export const verifyToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);

  } catch (err) {
    if (err instanceof Error) {
      throw new AppError({ message: err.message });
    }
  }
};

export const genRefreshToken = (userId: string, secret: string) => {
  return jwt.sign({ userId }, secret, {
    expiresIn: '7d',
  });
};

