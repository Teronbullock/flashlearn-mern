import { pgTable, serial, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users.schema';
import { cards } from './cards.schema';


// Define the sets table using Drizzle ORM
export const sets = pgTable('fc_sets', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  title: varchar('title', { length: 500 }).notNull(),
  description: varchar('description', { length: 500 }).default('No description added'),
});

export const setsRelations = relations(sets, ({one, many}) => ({
  users: one(users, {
    fields: [sets.userId],
    references: [users.id],
  }),
  cards: many(cards),

}));