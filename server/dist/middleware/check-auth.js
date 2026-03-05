import { verifyToken } from '../services/token-service';
import { AppError } from '../lib/AppError';
export const checkAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            throw new AppError({ message: 'MISSING_HEADER', status: 401 });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new AppError({ message: 'MISSING_TOKEN', status: 401 });
        }
        const decodedToken = verifyToken(token, process.env.JWT_SECRET || '');
        req.userId = decodedToken.userId;
        next();
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=check-auth.js.map