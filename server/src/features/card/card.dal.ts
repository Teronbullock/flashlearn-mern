import { db } from '../../db/database.js';
import { eq, asc, and } from 'drizzle-orm';
import { cardsTable, type CardInsertType, type CardFormType } from '@flashlearn/schema-db';
import e from 'express';




export const createCard = async (data: CardInsertType) => {
  return await db.insert(cardsTable).values(data).returning();
};

export const getSetCardsBySetId = async (setId: string, userId: string) => {
  return await db.select().from(cardsTable).where(and(
    eq(cardsTable.setId, Number(setId)),
    eq(cardsTable.userId, userId)
  )).orderBy(asc(cardsTable.id));
};

export const getCardBySetId = async (setId: string, userId: string) => {
  return await db.select().from(cardsTable).where(and(
    eq(cardsTable.setId, Number(setId)),
    eq(cardsTable.userId, userId)
  )
  ).limit(1);
};

export const getCardsBySetIdWithPagination = async (setId: string | string[], page: number, userId: string) => {
  return await db.select()
    .from(cardsTable)
    .where(and(
      eq(cardsTable.setId, Number(setId)),
      eq(cardsTable.userId, userId)
    ))
    .orderBy(asc(cardsTable.id))
    .limit(1)
    .offset(page - 1);
};

export const updateCard = async (data: CardFormType, setId: string, id: string, userId: string,) => {
  return await db.update(cardsTable).set({
    term: data.term,
    definition: data.definition,
  }).where(and(
    eq(cardsTable.userId, userId),
    eq(cardsTable.setId, Number(setId)),
    eq(cardsTable.id, Number(id)),
  )).returning();
};

export const deleteCard = async (id: string, userId: string) => {
  return await db.delete(cardsTable).where(and(
    eq(cardsTable.id, Number(id)),
    eq(cardsTable.userId, userId)
  )).returning();
};