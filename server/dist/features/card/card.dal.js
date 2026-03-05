import { db } from '../../db/database.js';
import { eq, asc, and } from 'drizzle-orm';
import { cardsTable } from '@flashlearn/schema-db';
export const createCard = async (data) => {
    return await db.insert(cardsTable).values(data).returning();
};
export const getSetCardsBySetId = async (setId, userId) => {
    return await db.select().from(cardsTable).where(and(eq(cardsTable.setId, Number(setId)), eq(cardsTable.userId, userId))).orderBy(asc(cardsTable.id));
};
export const getCardBySetId = async (setId, userId) => {
    return await db.select().from(cardsTable).where(and(eq(cardsTable.setId, Number(setId)), eq(cardsTable.userId, userId))).limit(1);
};
export const getCardsBySetIdWithPagination = async (setId, page, userId) => {
    return await db.select()
        .from(cardsTable)
        .where(and(eq(cardsTable.setId, Number(setId)), eq(cardsTable.userId, userId)))
        .orderBy(asc(cardsTable.id))
        .limit(1)
        .offset(page - 1);
};
export const updateCard = async (data, setId, id, userId) => {
    return await db.update(cardsTable).set({
        term: data.term,
        definition: data.definition,
    }).where(and(eq(cardsTable.userId, userId), eq(cardsTable.setId, Number(setId)), eq(cardsTable.id, Number(id)))).returning();
};
export const deleteCard = async (id, userId) => {
    return await db.delete(cardsTable).where(and(eq(cardsTable.id, Number(id)), eq(cardsTable.userId, userId))).returning();
};
//# sourceMappingURL=card.dal.js.map