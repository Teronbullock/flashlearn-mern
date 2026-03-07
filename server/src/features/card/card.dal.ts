import { db } from '../../db/database.js';
import { eq, asc, and } from 'drizzle-orm';
import {
  cardsTable,
  type CardInsertType,
  type CardFormType,
  type BaseCardDal,
  type FetchCard,
  type FetchCardWithPagination,
  type UpdateCard,
  type DeleteCard
} from '@flashlearn/schema-db';



export const createCard = async (data: CardInsertType) => {
  return await db.insert(cardsTable).values(data).returning();
};

export const getCardListBySetId = async ({ setId, userId }: BaseCardDal) => {
  return await db.select().from(cardsTable).where(and(
    eq(cardsTable.setId, Number(setId)),
    eq(cardsTable.userId, userId)
  )).orderBy(asc(cardsTable.id));
};

export const getCardBySetIdAndCardId = async ({ setId, userId, cardId }: FetchCard) => {
  return await db.select().from(cardsTable).where(and(
    eq(cardsTable.setId, Number(setId)),
    eq(cardsTable.userId, userId),
    eq(cardsTable.id, Number(cardId)),
  )
  ).limit(1);
};

export const getCardsBySetIdWithPagination = async ({ setId, page, userId }: FetchCardWithPagination) => {
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

export const updateCard = async ({
  term,
  definition,
  setId,
  cardId,
  userId
}: UpdateCard) => {
  return await db.update(cardsTable).set({
    term: term,
    definition: definition,
  }).where(and(
    eq(cardsTable.userId, userId),
    eq(cardsTable.setId, Number(setId)),
    eq(cardsTable.id, Number(cardId)),
  )).returning();
};

export const deleteCard = async ({ cardId, userId }: DeleteCard) => {
  return await db.delete(cardsTable).where(and(
    eq(cardsTable.id, Number(cardId)),
    eq(cardsTable.userId, userId)
  )).returning();
};