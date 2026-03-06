import { Response } from 'express';
import { AuthRequest } from '../../types/auth.js';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { deleteSetById, getSetByTitle, getSets, createSet, updateSet, getSetById } from './set.dal';
import { AppError } from '../../lib/AppError';


export const getAllSets = asyncHandler(async (req: AuthRequest, res: Response) => {
  const sets = await getSets(req.userId);

  res.status(200).json({
    msg: sets.length ? 'success' : 'no sets found',
    sets,
  });
});

export const getEditSet = asyncHandler(async (req: AuthRequest, res: Response) => {
  let { setId } = req.params;

  if (!setId) {
    throw new AppError({ message: 'Resources are required' });
  }

  if (Array.isArray(setId)) {
    setId = setId[0];
  }

  const set = await getSetById(setId, req.userId);

  res.status(200).json({
    set,
    msg: 'success',
  });
});

export const postCreateSet = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;
  const userId = req.userId;

  // check for title or throw an error
  if (!title) {
    throw new AppError({ message: 'Resources are required' });
  }

  const existingSet = await getSetByTitle(title, req.userId);

  if (existingSet.length > 0) {
    throw new AppError({ message: 'set name already taken' });
  }

  try {
    const [newSet] = await createSet({
      title,
      description,
      userId,
    });

    res.status(200).json({
      msg: 'Set created!',
      set: newSet,
    });
  } catch (error) {
    throw new AppError({ message: 'Error creating set' });
  }
}, 403);

export const putEditSet = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  let { setId } = req.params;
  const { title, description } = req.body;

  if (!setId || !title) {
    throw new AppError({ message: 'Resources are required' });
  }

  if (Array.isArray(setId)) {
    setId = setId[0];
  }

  const existingSets = await getSetByTitle(title, req.userId);

  const duplicateSet = existingSets.find(set => set.id !== Number(setId));
  if (duplicateSet) {
    throw new AppError({ message: 'set name already taken' });
  }

  const set = await getSetById(setId, req.userId);

  if (!set) {
    throw new AppError({ message: 'User not authenticated' });
  }


  try {
    const [updatedSet] = await updateSet({
      title,
      description,
      userId,
    });

    res.status(200).json({
      msg: 'Set updated!',
      set: updatedSet,
    });
  } catch (err) {
    throw new AppError({ message: 'Error: could not update set' });
  }
});

export const deleteSet = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const setId = req.params.setId as string;

  if (!setId || !userId) {
    throw new AppError({ message: 'Missing Credentials', status: 401 });
  }

  const deletedRows = await deleteSetById(setId, userId);

  if (!deletedRows || deletedRows.length === 0) {
    throw new AppError({ message: 'Set not found or already deleted', status: 404 });
  }

  res.status(200).json({
    msg: 'Your set and all of its cards have been deleted',
    isSetDeleted: deletedRows[0],
  });
}, 403);
