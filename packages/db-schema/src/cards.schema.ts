import { pgTable, serial, uuid, integer, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { users } from './users.schema';
import { sets } from './sets.schema';

// Define the cards table using Drizzle ORM
export const cards = pgTable('fc_cards', {
  id: serial('id').primaryKey().notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  setId: integer('set_id')
    .notNull()
    .references(() => sets.id),
  term: varchar('term', { length: 1000 }).notNull(),
  definition: varchar('definition', { length: 1000 }).notNull(),
});

export const cardsRelations = relations(cards, ({one}) => ({
  users: one(users, {
    fields: [cards.userId],
    references: [users.id],
  }),
  sets: one(sets, {
    fields: [cards.setId],
    references: [sets.id],
  }),
}));