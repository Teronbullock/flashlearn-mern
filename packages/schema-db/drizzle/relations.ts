import { relations } from "drizzle-orm/relations";
import { fcUsers, fcCards, fcSets, fcRefreshTokens } from "./schema";

export const fcCardsRelations = relations(fcCards, ({one}) => ({
	fcUser: one(fcUsers, {
		fields: [fcCards.userId],
		references: [fcUsers.id]
	}),
	fcSet: one(fcSets, {
		fields: [fcCards.setId],
		references: [fcSets.id]
	}),
}));

export const fcUsersRelations = relations(fcUsers, ({many}) => ({
	fcCards: many(fcCards),
	fcSets: many(fcSets),
	fcRefreshTokens: many(fcRefreshTokens),
}));

export const fcSetsRelations = relations(fcSets, ({one, many}) => ({
	fcCards: many(fcCards),
	fcUser: one(fcUsers, {
		fields: [fcSets.userId],
		references: [fcUsers.id]
	}),
}));

export const fcRefreshTokensRelations = relations(fcRefreshTokens, ({one}) => ({
	fcUser: one(fcUsers, {
		fields: [fcRefreshTokens.userId],
		references: [fcUsers.id]
	}),
}));