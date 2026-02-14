import { pgTable, serial, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { usersTable } from './users-schema';
import { cardsTable } from './cards-schema';


// Define the sets table using Drizzle ORM
export const setsTable = pgTable('fc_sets', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id),
  title: varchar('title', { length: 500 }).notNull(),
  description: varchar('description', { length: 500 }).default('No description added'),
});

export const setsRelations = relations(setsTable, ({one, many}) => ({
  users: one(usersTable, {
    fields: [setsTable.userId],
    references: [usersTable.id],
  }),
  cards: many(cardsTable),

}));