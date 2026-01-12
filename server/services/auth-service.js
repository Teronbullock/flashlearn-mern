import Users from '../models/users-model.js';
import bcrypt from 'bcrypt';

/**
 * Authenticate input against database documents
 * 
 * @param {*} useremail  - The useremail
 * @param {*} password - The password
 * @param {*} callback - The callback function to call after completion
 * @returns 
 */
export const authenticateUser = async (useremail, password ) => {
  
    try {
      const user = await Users.findOne({ where: {user_email: useremail} }, { raw: true });

      if (!user) {
        const err = new Error('Useremail is incorrect');
        err.status = 401;
        throw err;
      }
      
      // compare the password
      const bcryptResult = await bcrypt.compare(password, user.user_pass);
      
      // if the password is incorrect
      if(!bcryptResult){
        const err = new Error('Password is incorrect');
        err.status = 401;
        throw err;
      }
    
      // return the user
      return user;
    
    } catch (err) {
      console.log('Error: Users authenticate did not work');
      throw err;
    }
};

