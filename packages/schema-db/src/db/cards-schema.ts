import { pgTable, serial, uuid, integer, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { usersTable } from './users-schema';
import { setsTable } from './sets-schema';

// Define the cards table using Drizzle ORM
export const cardsTable = pgTable('fc_cards', {
  id: serial('id').primaryKey().notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id),
  setId: integer('set_id')
    .notNull()
    .references(() => setsTable.id),
  term: varchar('term', { length: 1000 }).notNull(),
  definition: varchar('definition', { length: 1000 }).notNull(),
});

export const cardsRelations = relations(cardsTable, ({one}) => ({
  users: one(usersTable, {
    fields: [cardsTable.userId],
    references: [usersTable.id],
  }),
  sets: one(setsTable, {
    fields: [cardsTable.setId],
    references: [setsTable.id],
  }),
}));