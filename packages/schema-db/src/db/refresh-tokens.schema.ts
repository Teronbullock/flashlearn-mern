import { pgTable, serial, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users.schema';

// Define the refresh tokens table using Drizzle ORM
export const refreshTokens = pgTable('fc_refresh_tokens', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  token: varchar('token', { length: 255 }).notNull(),
});

export const refreshTokensRelations = relations(refreshTokens, ({one}) => ({
  users: one(users, {
    fields: [refreshTokens.userId],
    references: [users.id],
  }),
}));