import { pgTable, serial, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { usersTable } from './users-schema';

// Define the refresh tokens table using Drizzle ORM
export const refreshTokens = pgTable('fc_refresh_tokens', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id),
  token: varchar('token', { length: 255 }).notNull(),
});

export const refreshTokensRelations = relations(refreshTokens, ({one}) => ({
  users: one(usersTable, {
    fields: [refreshTokens.userId],
    references: [usersTable.id],
  }),
}));