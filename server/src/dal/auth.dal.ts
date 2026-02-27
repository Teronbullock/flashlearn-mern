import { db } from '../db/database.js';
import { eq } from 'drizzle-orm';
import { usersTable } from '@flashlearn/schema-db';

export const getUserByEmail = async (email: string) => {
  return await db.select().from(usersTable).where(eq(usersTable.email, email));
}

export const getUserById = async (id: string) => {
  return await db.select().from(usersTable).where(eq(usersTable.id, id));
}

export const getUserPasswordById = async (id: string) => {
  return await db.select({ password: usersTable.password }).from(usersTable).where(eq(usersTable.id, id));
}

export const getUserEmailById = async (id: string) => {
  return await db.select({ email: usersTable.email }).from(usersTable).where(eq(usersTable.id, id));
}

export const createUser = async (data: { email: string, password: string, slug: string }) => {
  return await db.insert(usersTable).values(data).returning();
}

export const updateUser = async (id: string, data: { email?: string, password?: string }) => {
  return await db.update(usersTable).set(data).where(eq(usersTable.id, id)).returning();
}

export const deleteUser = async (id: string) => {
  return await db.delete(usersTable).where(eq(usersTable.id, id)).returning();
}