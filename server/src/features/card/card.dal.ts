import { db } from '../../db/database.js';
import { eq, asc, and, lt, sql } from 'drizzle-orm';
import {
  cardsTable,
  type CardInsertType,
  type CardFormType,
  type BaseCardDal,
  type FetchCard,
  type FetchCardWithPagination,
  type UpdateCard,
  type DeleteCard,
  type CardRatingType
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

// Get cards that are due for review (nextReviewDate <= now)
export const getDueCards = async ({ userId }: { userId: string }) => {
  return await db.select().from(cardsTable).where(and(
    eq(cardsTable.userId, userId),
    lt(cardsTable.nextReviewDate, new Date())
  )).orderBy(asc(cardsTable.nextReviewDate));
};

// Update card with spaced repetition data after review
export const updateCardAfterReview = async ({
  cardId,
  userId,
  rating,
  nextReviewDate,
  interval,
  easeFactor,
  reviewCount,
  lastReviewedAt
}: {
  cardId: number;
  userId: string;
  rating: CardRatingType['rating'];
  nextReviewDate: Date;
  interval: number;
  easeFactor: number;
  reviewCount: number;
  lastReviewedAt: Date;
}) => {
  // Update card with new spaced repetition values
  const result = await db.update(cardsTable).set({
    nextReviewDate,
    interval,
    easeFactor,
    reviewCount,
    lastReviewedAt,
    ratingHistory: sql`${cardsTable.ratingHistory} || ${JSON.stringify([{
      rating,
      reviewedAt: lastReviewedAt.toISOString()
    }])}`
  }).where(and(
    eq(cardsTable.id, cardId),
    eq(cardsTable.userId, userId)
  )).returning();

  return result;
};

// Reset card review data (for resetting progress)
export const resetCardProgress = async ({ cardId, userId }: { cardId: number; userId: string }) => {
  return await db.update(cardsTable).set({
    nextReviewDate: new Date(),
    interval: 1,
    easeFactor: 2.5,
    reviewCount: 0,
    lastReviewedAt: null,
    ratingHistory: '[]'
  }).where(and(
    eq(cardsTable.id, cardId),
    eq(cardsTable.userId, userId)
  )).returning();
};