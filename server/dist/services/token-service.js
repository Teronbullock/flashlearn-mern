import jwt from 'jsonwebtoken';
import { AppError } from '../lib/AppError';
export const genAuthToken = (userId, secret) => {
    try {
        const token = jwt.sign({ userId }, secret, { expiresIn: '15m' });
        // sets the token expiration time to 15 minutes
        const tokenExpTime = new Date(new Date().getTime() + 1000 * 60 * 15);
        return { token, tokenExpTime };
    }
    catch (err) {
        throw new AppError({ message: err instanceof Error ? err.message : 'Error generating token' });
    }
};
export const verifyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    }
    catch (err) {
        throw new AppError({
            message: err instanceof Error ? err.message : 'Invalid token'
        });
    }
};
export const genRefreshToken = (userId, secret) => {
    try {
        return jwt.sign({ userId }, secret, {
            expiresIn: '7d',
        });
    }
    catch (err) {
        throw new AppError({ message: err instanceof Error ? err.message : 'Error generating refresh token' });
    }
};
//# sourceMappingURL=token-service.js.map