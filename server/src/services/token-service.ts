import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../lib/AppError';

export interface TokenType extends JwtPayload {
  userId: string;
}

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
    throw new AppError({ message: err instanceof Error ? err.message : 'Error generating token' });
  }
};

export const verifyToken = (token: string, secret: string): TokenType => {
  try {
    return jwt.verify(token, secret) as TokenType;

  } catch (err) {
    throw new AppError({
      message: err instanceof Error ? err.message : 'Invalid token'
    });
  }
};

export const genRefreshToken = (userId: string, secret: string) => {
  try {
    return jwt.sign({ userId }, secret, {
      expiresIn: '7d',
    });

  } catch (err) {
    throw new AppError({ message: err instanceof Error ? err.message : 'Error generating refresh token' });
  }
};

