import { DataTypes } from 'sequelize';
import db from '../db/database.js';
import bcrypt from 'bcrypt';
const Users = db.define('fc_users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    user_pass: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});
/**
 * Authenticate input against database documents
 *
 * @param {*} userEmail  - The user email
 * @param {*} password - The password
 * @param {*} callback - The callback function to call after completion
 * @returns
 */
Users.authenticate = async (userEmail, password, callback) => {
    try {
        const user = await Users.findOne({ where: { user_email: userEmail } }, { raw: true });
        if (!user) {
            const err = new Error('User not found');
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password, user.user_pass, (error, result) => {
            if (result === true) {
                callback(null, user);
            }
            else {
                callback();
            }
        });
    }
    catch (error) {
        console.log('Error: Users.authenticate did not work');
        callback(error);
    }
};
// hash password before saving to database using Hooks
Users.beforeCreate(async (users, options) => {
    try {
        const hash = await bcrypt.hash(users.user_pass, 10);
        users.user_pass = hash;
        console.log('Users.beforeCreate: ');
    }
    catch (error) {
        console.log('Error: Encryption did not work', error);
    }
});
// hash password before saving to database using Hooks
Users.beforeUpdate(async (users, options) => {
    if (!users.changed('user_pass')) {
        return;
    }
    console.log('Users.beforeUpdate: ');
    try {
        const hash = await bcrypt.hash(users.user_pass, 10);
        users.user_pass = hash;
        console.log('Users.beforeUpdate: ');
    }
    catch (error) {
        console.log('Error: Encryption did not work', error);
    }
});
export default Users;
//# sourceMappingURL=users-model.js.map