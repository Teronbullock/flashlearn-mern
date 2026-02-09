import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { cards } from './cards.schema';
import { sets } from './sets.schema';
import { refreshTokens } from './refresh-tokens.schema';


// Define the users table using Drizzle ORM
export const users = pgTable('fc_users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 125 }).notNull().unique(),
  pass: varchar('pass', { length: 125 }).notNull(),
  slug: varchar('slug', { length: 125 }).notNull().unique(),
});

export const usersRelations = relations(users, ({many, one}) => ({
  cards: many(cards),
  sets: many(sets),
  refreshTokens: one(refreshTokens),
}));