import bcrypt from 'bcrypt';
import { db } from '../db/database';
import { eq } from 'drizzle-orm';
import { schemaDb } from '@flashlearn/schema-db';
import { comparePassword } from '../lib/auth';

interface CustomError extends Error {
  status?: number;
}

const { usersTable } = schemaDb;


/**
 * Authenticate input against database documents
 * 
 * @param {*} email  - The useremail
 * @param {*} password - The password
 * @param {*} callback - The callback function to call after completion
 * @returns 
 */
export const authenticateUser = async (email: string, password: string ) => {

    try {
      const userRes = await db.select().from(usersTable).where(eq(usersTable.email, email));
      
      // if the user does not exist
      const user = userRes[0];
      
      // if the user does not exist
      if (!user) {
       return false;
      }
      
      // compare the password
      const compareResult = await comparePassword(password, user.pass);

      // if the password is incorrect
      if (!compareResult) {
        return false;
      }

      // return the user
      return user;
    
    } catch (err) {
      throw err instanceof Error ? err.message : 'Authentication failed. Unknown error occurred';
    }
};

