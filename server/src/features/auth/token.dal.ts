import { db } from '../../db/database';
import { eq } from 'drizzle-orm';
import { refreshTokens } from '@flashlearn/schema-db';

export const storeRefreshToken = async (userId, refreshToken) => {
  return await db.insert(refreshTokens).values({
    userId,
    token: refreshToken,
  }).returning();
};

export const deleteRefreshToken = async (userId) => {
  return await db.delete(refreshTokens)
    .where(eq(refreshTokens.userId, userId))
    .returning();
};