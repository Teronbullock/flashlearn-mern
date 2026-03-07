import {
  setsTable,
  type SetInsertType,
  type BaseSetDal,
  type SetDal
} from '@flashlearn/schema-db';
import { eq, and, sql } from 'drizzle-orm';
import { db } from '../../db/database.js';


export const getSets = async (userId: string) => {
  return db.execute(sql`
    SELECT 
    fc_sets.*,
    COUNT(fc_cards.id) AS "cardCount"
    FROM fc_sets
    LEFT JOIN fc_cards ON fc_cards.set_id = fc_sets.id
    WHERE fc_sets.user_id = ${userId}
    GROUP BY fc_sets.id
    ORDER BY fc_sets.id DESC
    `);
}

export const getSetByTitle = async ({ title, userId }: SetDal) => {
  return await db.select().from(setsTable).where(
    and(
      eq(setsTable.userId, userId),
      eq(setsTable.title, title)
    )
  )
    .limit(1);
}

export const getSetById = async ({ id, userId }: BaseSetDal) => {
  return await db.select().from(setsTable).where(
    and(
      eq(setsTable.id, Number(id)),
      eq(setsTable.userId, userId)
    )
  ).limit(1);
}

export const createSet = async ({ title, description, userId }: SetInsertType) => {
  return await db.insert(setsTable)
    .values({
      title,
      description,
      userId,
    })
    .returning();
};

export const updateSet = async ({ title, description, userId }: SetInsertType) => {
  return await db.update(setsTable)
    .set({
      title,
      description,
    })
    .where(eq(setsTable.userId, userId))
    .returning();
};

export const deleteSetById = async ({ id, userId }: BaseSetDal) => {
  return await db.delete(setsTable)
    .where(
      and(
        eq(setsTable.id, Number(id)),
        eq(setsTable.userId, userId)
      )
    ).returning({ id: setsTable.id });
}