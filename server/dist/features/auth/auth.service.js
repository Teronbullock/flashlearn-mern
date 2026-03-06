import { getUserByEmail } from './auth.dal';
import { comparePassword } from './auth.utils';
export const authenticateUser = async (email, password) => {
    const [user] = await getUserByEmail(email);
    if (!user) {
        return null;
    }
    const compareResult = await comparePassword(password, user.password);
    if (!compareResult) {
        return null;
    }
    return user;
};
//# sourceMappingURL=auth.service.js.map