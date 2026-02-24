import { checkResourceOwnership } from '../services/permission-service.js';
import { db } from '../db/database.js';
import { setsTable, cardsTable } from '@flashlearn/schema-db';
import { eq, desc, count, and, sql } from 'drizzle-orm';
import asyncHandler from '../middleware/asyncHandler.js';
import { set } from 'zod';
// import { set } from 'zod';


/**
 * @desc    Get all sets for a user with card counts
 * @route   GET /api/sets
 * @access  Private
 */
export const getAllSets = asyncHandler(async (req, res, next) => {
  const userId = req.userId;

  // check for userId
  if (!userId) {
    throw new Error('User Not Authenticated');
  }

  const setsRes = await db.execute(sql`
    SELECT 
    fc_sets.*,
    COUNT(fc_cards.id) AS "cardCount"
    FROM fc_sets
    LEFT JOIN fc_cards ON fc_cards.set_id = fc_sets.id
    WHERE fc_sets.user_id = ${userId}
    GROUP BY fc_sets.id
    ORDER BY fc_sets.id DESC
    `);

  if (!setsRes.length) {
    res.status(200).json({
      msg: 'success, no sets found',
      sets: [],
    });
    return;
  }

  res.status(200).json({
    msg: 'success',
    sets: setsRes,
  });
});

/**
 * @desc    Get a specific set for editing
 * @route   GET /api/sets/:setId
 * @access  Private
 */
export const getEditSet = asyncHandler(async (req, res) => {
  const { setId } = req.params;
  const userId = req.userId;

  const set = await checkResourceOwnership(setsTable, setId, userId);
  res.status(200).json({
    set,
    msg: 'success',
  });
});

/**
 * @desc    Create a new set for a user
 * @route   POST /api/sets
 * @access  Private
 */
export const postCreateSet = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;


  // check for title or throw an error
  if (!title) {
    throw new Error('Title is required');
  }

  // check if set exists in DB
  const existingSet = await db.select()
    .from(setsTable)
    .where(
      and(
        eq(setsTable.userId, userId),
        eq(setsTable.title, title)
      )
    )
    .limit(1);


  // return if set exists
  if (existingSet.length > 0) {
    throw new Error('set name already taken');
  }

  try {
    const [newSet] = await db.insert(setsTable)
      .values({
        title,
        description,
        userId,
      })
      .returning();

    res.status(200).json({
      msg: 'Set created!',
      set: newSet,
    });
  } catch (error) {
    throw new Error('Error creating set');
  }
}, 403);

/**
 * @desc    Update an existing set
 * @route   PUT /api/sets/:setId
 * @access  Private
 */
export const putEditSet = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const { setId } = req.params;
  const userId = req.userId;

  // Check if the set belongs to the user
  const set = await checkResourceOwnership(setsTable, setId, userId);

  if (!title) {
    throw new Error('Title is required');
  }

  if (!set) {
    throw new Error('User not authenticated');
  }

  // check if set exist in db with same title for this user
  const existingSets = await db.select()
    .from(setsTable)
    .where(
      and(
        eq(setsTable.title, title),
        eq(setsTable.userId, userId)
      )
    );

  // Find if there's an existing set with the same title but different ID
  const duplicateSet = existingSets.find(set => set.id != setId);
  if (duplicateSet) {
    throw new Error('set name already taken');
  }

  try {
    const [updatedSet] = await db.update(setsTable)
      .set({
        title,
        description,
      })
      .where(eq(setsTable.id, setId))
      .returning();

    res.status(200).json({
      msg: 'Set updated!',
      set: updatedSet,
    });
  } catch (err) {
    throw new Error('Error: could not update set');
  }
});

/**
 * @desc    Delete a set and all its associated cards
 * @route   DELETE /api/sets/:setId
 * @access  Private
 */
export const deleteSet = asyncHandler(async (req, res) => {
  const { setId } = req.params;
  const userId = req.userId;

  // Check if the set belongs to the user
  const set = await checkResourceOwnership(setsTable, setId, userId);

  let isSetDeleted = false;
  let deletedCard = null;
  let newCards = null;

  // delete cards
  await db.delete(cardsTable)
    .where(
      and(
        eq(cardsTable.userId, set.userId),
        eq(cardsTable.setId, set.id)
      )
    );
  console.log(`All cards were deleted for set ${set.id}`);

  // delete set

  // Check if there are any remaining cards
  const remainingCards = await db.select()
    .from(cardsTable)
    .where(
      and(
        eq(cardsTable.userId, set.userId),
        eq(cardsTable.setId, set.id)
      )
    );

  if (remainingCards.length) {
    const err = new Error('Cannot delete set with cards');
    err.status = 400;
    throw err;
  }

  const result = await db.delete(setsTable)
    .where(
      and(
        eq(setsTable.id, set.id),
        eq(setsTable.userId, set.userId)
      )
    );

  isSetDeleted = true;

  console.log('Set ' + setId + ' is deleted');

  res.status(200).json({
    msg: 'Your set and all of its cards have been deleted',
    isSetDeleted,
  });
}, 403);
