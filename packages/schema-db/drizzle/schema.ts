import { pgTable, foreignKey, serial, uuid, integer, varchar, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const fcCards = pgTable("fc_cards", {
	id: serial().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	setId: integer("set_id").notNull(),
	term: varchar({ length: 1000 }).notNull(),
	definition: varchar({ length: 1000 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [fcUsers.id],
			name: "fc_cards_user_id_fc_users_id_fk"
		}),
	foreignKey({
			columns: [table.setId],
			foreignColumns: [fcSets.id],
			name: "fc_cards_set_id_fc_sets_id_fk"
		}),
]);

export const fcSets = pgTable("fc_sets", {
	id: serial().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	title: varchar({ length: 500 }).notNull(),
	description: varchar({ length: 500 }).default('No description added'),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [fcUsers.id],
			name: "fc_sets_user_id_fc_users_id_fk"
		}),
]);

export const fcRefreshTokens = pgTable("fc_refresh_tokens", {
	id: serial().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	token: varchar({ length: 255 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [fcUsers.id],
			name: "fc_refresh_tokens_user_id_fc_users_id_fk"
		}),
]);

export const fcUsers = pgTable("fc_users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	email: varchar({ length: 255 }).notNull(),
	pass: varchar({ length: 255 }).notNull(),
	slug: varchar({ length: 125 }).notNull(),
}, (table) => [
	unique("fc_users_email_unique").on(table.email),
	unique("fc_users_slug_unique").on(table.slug),
]);
