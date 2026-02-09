import bcrypt from 'bcrypt';
import { db } from '../db/database';
import { eq } from 'drizzle-orm';
import { schemaDb } from '@flashlearn/schema-db';

const { users } = schemaDb;


/**
 * Authenticate input against database documents
 * 
 * @param {*} email  - The useremail
 * @param {*} password - The password
 * @param {*} callback - The callback function to call after completion
 * @returns 
 */
export const authenticateUser = async (email, password ) => {

    try {
      const userRes = await db.select().from(users).where(eq(users.email, email));
      // if the user does not exist
      const user = userRes[0];
      
      // if the user does not exist
      if (!user) {
        const err = new Error('User email is incorrect');
        err.status = 401;
        throw err;
      }
      
      // compare the password
      const bcryptResult = await bcrypt.compare(password, user.pass);
      
      // if the password is incorrect
      if(!bcryptResult){
        const err = new Error('Password is incorrect');
        err.status = 401;
        throw err;
      }
    
      // return the user
      return user;
    
    } catch (err) {
      console.error(err);
      throw err;
    }
};

