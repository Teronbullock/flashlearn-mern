import { checkResourceOwnership } from '../services/permission-service.js';
import { db } from '../db/database.js';
import { schemaDb } from '@flashlearn/schema-db';
import { eq, desc, count, and } from 'drizzle-orm';
// import { set } from 'zod';

const { sets, cards } = schemaDb;

/**
 * @desc    Get all sets for a user with card counts
 * @route   GET /api/sets
 * @access  Private
 */
export const getAllSets = async (req, res, next) => {
  const userId = req.userId;
  let setsRes = [];


  // check for userId
  if (!userId) {
    throw new Error('User Not Authenticated');
  }

  
  try {
    // fetch all sets for the authenticated user
    setsRes = await db.select()
      .from(sets)
      .where(eq(sets.userId, userId))
      .orderBy(desc(sets.id));

    if (!setsRes || setsRes.length === 0) {
      res.status(200).json({
        msg: 'success, no sets found',
        sets: [],
      });
      return;
    }

    // get card count for each set
    for (const [index, set] of setsRes.entries()) {
      const result = await db.select()
        .from(cards)
        .where(
          and(
            eq(cards.userId, userId),
            eq(cards.setId, set.id)
          )
        );
      const count = result[0]?.count || 0;

      // add card count to each set
      setsRes[index].cardCount = count;
    }

    res.status(200).json({
      msg: 'success',
      sets: setsRes,
    });
  } catch (err) {
    console.error(err);
    throw new Error('Error retrieving sets');
  }
};

/**
 * @desc    Get a specific set for editing
 * @route   GET /api/sets/:setId
 * @access  Private
 */
export const getEditSet = async (req, res) => {
  const { setId } = req.params;
  const userId = req.userId;

  const set = await checkResourceOwnership(sets, setId, userId);
  res.status(200).json({
    set,
    msg: 'success',
  });
};

/**
 * @desc    Create a new set for a user
 * @route   POST /api/sets
 * @access  Private
 */
export const postCreateSet = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;

  // check for title or throw an error
  if (!title) {
    throw new Error('Title is required');
  }
  // check if set exists in DB
  const existingSet = await db.select()
  .from(sets)
  .where(
    and(
      eq(sets.userId, userId),
      eq(sets.title, title)
    )
  )
  .limit(1);
  

  // return if set exists
  if (existingSet.length > 0) {
    throw new Error('set name already taken');
  }

  try {
    const [newSet] = await db.insert(sets)
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
};

/**
 * @desc    Update an existing set
 * @route   PUT /api/sets/:setId
 * @access  Private
 */
export const putEditSet = async (req, res) => {
  const { title, description } = req.body;
  const { setId } = req.params;
  const userId = req.userId;

  // Check if the set belongs to the user
  await checkResourceOwnership(sets, setId, userId);

  // check if set exist in db with same title for this user
  const existingSets = await db.select()
    .from(sets)
    .where(
      and(
        eq(sets.title, title),
        eq(sets.userId, userId)
      )
    );

  // Find if there's an existing set with the same title but different ID
  const duplicateSet = existingSets.find(set => set.id != setId);
  if (duplicateSet) {
    throw new Error('set name already taken');
  }

  try {
    const [updatedSet] = await db.update(sets)
      .set({
        title,
        description,
      })
      .where(eq(sets.id, setId))
      .returning();
      
    res.status(200).json({
      msg: 'Set updated!',
      set: updatedSet,
    });
  } catch (err) {
    throw new Error('Error: could not update set');
  }
};

/**
 * @desc    Delete a set and all its associated cards
 * @route   DELETE /api/sets/:setId
 * @access  Private
 */
export const deleteSet = async (req, res) => {
  const { setId } = req.params;
  const userId = req.userId;

  // Check if the set belongs to the user
  const set = await checkResourceOwnership(sets, setId, userId);

  let isSetDeleted = false;
  let deletedCard = null;
  let newCards = null;

  // delete cards
  try {
    await db.delete(cards)
      .where(
        and(
          eq(cards.userId, set.userId),
          eq(cards.setId, set.id)
        )
      );
    console.log(`All cards were deleted for set ${set.id}`);
  } catch (err) {
    console.error(set);
    throw new Error(`Error deleting cards for set ${set.id}: `);
  }

  // delete set
  try {
    // Check if there are any remaining cards
    const remainingCards = await db.select()
      .from(cards)
      .where(
        and(
          eq(cards.userId, set.userId),
          eq(cards.setId, set.id)
        )
      );

    if (remainingCards.length !== 0) {
      const err = new Error('Cannot delete set with cards');
      err.status = 400;
      throw err;
    }

    const result = await db.delete(sets)
      .where(
        and(
          eq(sets.id, set.id),
          eq(sets.userId, set.userId)
        )
      );

    isSetDeleted = true; // The operation succeeded if no error was thrown

    console.log('Set ' + setId + ' is deleted');

    res.status(200).json({
      msg: 'Your set and all of its cards have been deleted',
      isSetDeleted,
    });

  } catch (err) {
    throw new Error(`Error deleting set ${setId}: `);
  }
};
