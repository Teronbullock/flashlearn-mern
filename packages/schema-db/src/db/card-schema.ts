import { pgTable, serial, uuid, integer, varchar, timestamp, numeric } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { usersTable } from './users-schema';
import { setsTable } from './set-schema';

// Define the cards table using Drizzle ORM
export const cardsTable = pgTable('fc_cards', {
  id: serial('id').primaryKey().notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id),
  setId: integer('set_id')
    .notNull()
    .references(() => setsTable.id, { onDelete: 'cascade' }),
  term: varchar('term', { length: 1000 }).notNull(),
  definition: varchar('definition', { length: 1000 }).notNull(),
  nextReviewDate: timestamp('next_review_date').defaultNow(),
  interval: integer('interval').default(1),
  easeFactor: numeric('ease_factor', { precision: 3, scale: 2 }).default('2.50'),
  reviewCount: integer('review_count').default(0),
  lastReviewedAt: timestamp('last_reviewed_at'),
  ratingHistory: varchar('rating_history', { length: 1000 }).default('[]'),
});

export const cardsRelations = relations(cardsTable, ({ one }) => ({
  users: one(usersTable, {
    fields: [cardsTable.userId],
    references: [usersTable.id],
  }),
  sets: one(setsTable, {
    fields: [cardsTable.setId],
    references: [setsTable.id],
  }),
}));