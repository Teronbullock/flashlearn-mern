import bcrypt from 'bcrypt';
import { usersTable, ProfileUpdateEmailSchema, ProfileUpdatePasswordSchema, ProfileDeleteAccountSchema } from '@flashlearn/schema-db';
import { db } from '../db/database.js';
import { eq } from 'drizzle-orm';
import { ZodError } from 'zod';


/**
 * -- get user profile --
 */
export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    throw new Error('User credentials not found.');
  }

  const [user] = await db.select({ email: usersTable.email }).from(usersTable).where(eq(usersTable.id, userId));
  
  if (!user) {
    throw new Error('User not found.');
  }
  
  return res.status(200).json({
    email: user.email,
  });
};


/**
 * -- put update user email --
 */
export const putUpdateUserEmail = async (req, res) => {
  const { email, pass: userOldPass } = req.body;
  const userId = req.userId;

  try {
    // Validate input using Zod schema
    ProfileUpdateEmailSchema.parse({ email, pass: userOldPass });
  } catch (err) {
    if (err instanceof ZodError) {
      const errorMessage = err.errors.map((e) => e.message).join(' ');
      throw new Error(`Validation Error: ${errorMessage}`);
    }
    throw new Error('Validation failed');
  }

  if (!userId) {
    throw new Error('User credentials not found.');
  }

  // check if user exists
  const [user] = await db.select({ pass: usersTable.pass }).from(usersTable).where(eq(usersTable.id, userId));

  if (!user) {
    throw new Error('User not found.');
  }

  const isOldPassMatch = await bcrypt.compare(userOldPass, user.pass);
  // check if old password matches
  if (!isOldPassMatch) {
    throw new Error('invalid credentials.');
  }

  // update user email
  const result = await db.update(usersTable).set({ email }).where(eq(usersTable.id, userId));

  // check if user was updated
  if (result.rowCount === 0) {
    throw new Error('User not found.');
  }

  res.status(200).json({
    msg: 'User updated successfully.',
  });

};


/**
 * -- put user password --
 */
export const putUpdateUserPassword = async (req, res) => {
  const { user_old_pass, pass, pass_confirm } = req.body;
  const userId = req.userId;

  try {
    // Validate input using Zod schema
    ProfileUpdatePasswordSchema.parse({ user_old_pass, pass, pass_confirm });
  } catch (err) {
    if (err instanceof ZodError) {
      const errorMessage = err.errors.map((e) => e.message).join(' ');
      throw new Error(`Validation Error: ${errorMessage}`);
    }
    throw new Error('Validation failed');
  }

  // check if user exists
  const [user] = await db.select({ pass: usersTable.pass }).from(usersTable).where(eq(usersTable.id, userId));

  if (!user) {
    throw new Error('User not found.');
  }

  // check old password match
  const isOldPassMatch = await bcrypt.compare(user_old_pass, user.pass);

  if (!isOldPassMatch) {
    throw new Error('Old password is incorrect.');
  }

  // hash the new password
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(pass, saltRounds);

  // update user data
  const result = await db.update(usersTable).set({ pass: hashedPassword }).where(eq(usersTable.id, userId));

  // check if user was updated
  if (result.rowCount === 0) {
    throw new Error('User not found.');
  }

  res.status(200).json({
    msg: 'User updated successfully.',
  });

};

export const putRemoveUser = async (req, res) => {
  const userId = req.userId;
  const { pass } = req.body;

  try {
    // Validate input using Zod schema
    ProfileDeleteAccountSchema.parse({ pass });
  } catch (err) {
    if (err instanceof ZodError) {
      const errorMessage = err.errors.map((e) => e.message).join(' ');
      throw new Error(`Validation Error: ${errorMessage}`);
    }
    throw new Error('Validation failed');
  }

  if (!userId) {
    throw new Error('User credentials not found.');
  }

  const [user] = await db.select({ pass: usersTable.pass }).from(usersTable).where(eq(usersTable.id, userId));

  if (!user) {
    throw new Error('User not found.');
  }

  const isOldPassMatch = await bcrypt.compare(pass, user.pass);

  if (!isOldPassMatch) {
    throw new Error('Invalid credentials.');
  }

  try {
    const result = await db.delete(usersTable).where(eq(usersTable.id, userId));

    if (result.rowCount === 0) {
      throw new Error('User not found.');
    }

    res.status(200).json({
      msg: 'User deleted successfully.',
    });

  } catch(error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user.');
  }
};
  
