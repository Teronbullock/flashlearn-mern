import { DataTypes } from 'sequelize';
import db from '../db/database.js';
import bcrypt from 'bcrypt';

const Users = db.define('fc_users', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true 
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    trim: true
  },
  user_pass: {
    type: DataTypes.STRING,
    allowNull: false,
  }
  
});

/**
 * Authenticate input against database documents
 * 
 * @param {*} username  - The username
 * @param {*} password - The password
 * @param {*} callback - The callback function to call after completion
 * @returns 
 */
Users.authenticate = async (username, password, callback) => {
  
    try {
      const user = await Users.findOne({ where: {user_name: username} }, { raw: true });

      if (!user) {
        const err = new Error('User not found');
        err.status = 401;
        return callback(err);
      }
      
      bcrypt.compare(password, user.user_pass, (error, result) => {
        if (result === true) {
          callback(null, user);
        } else {
          callback();
        }
      }) 

    } catch (error) {
      console.log('Error: Users.authenticate did not work');
      callback(error);
    }
};

// hash password before saving to database using Hooks
Users.beforeCreate( async (users, options) => {
  try {
    const hash = await bcrypt.hash(users.user_pass, 10);
    users.user_pass = hash;
    console.log('Users.beforeCreate: ');
  } catch (error) {
    console.log('Error: Encryption did not work', error);
  }
});

// hash password before saving to database using Hooks
Users.beforeUpdate( async (users, options) => {
  try {
    const hash = await bcrypt.hash(users.user_pass, 10);
    users.user_pass = hash;
    console.log('Users.beforeUpdate: ');
  } catch (error) {
    console.log('Error: Encryption did not work', error);
  }
});



(async () => {
  try {
    await Users.sync({alter: true});
    console.log("The Users model table is synced");
  } catch (error) {
    console.log("Error: The Users model table was not synced", error);
  }
})();

export default Users;