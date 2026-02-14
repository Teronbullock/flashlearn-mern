import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { cardsTable } from './cards-schema';
import { setsTable } from './sets-schema';
import { refreshTokens } from './refresh-tokens-schema';


// Define the users table using Drizzle ORM
export const usersTable = pgTable('fc_users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 125 }).notNull().unique(),
  pass: varchar('pass', { length: 125 }).notNull(),
  slug: varchar('slug', { length: 125 }).notNull().unique(),
});

export const usersRelations = relations(usersTable, ({many, one}) => ({
  cards: many(cardsTable),
  sets: many(setsTable),
  refreshTokens: one(refreshTokens),
}));