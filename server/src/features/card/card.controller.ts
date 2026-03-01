import { type Response, type Request } from 'express';
import { type AuthRequest } from '../../types';
import { verifyResourceOwnership } from '../../services/ownership.service';
import { setsTable, cardsTable, CardFormSchema } from '@flashlearn/schema-db';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import { getSetCardsBySetId, getCardBySetId, getCardsBySetIdWithPagination, updateCard, createCard, deleteCard } from './card.dal';
import { AppError } from '../../lib/AppError';


export const getCards = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  let setId = req.params.setId as string;

  if (!setId || !userId) {
    throw new AppError({ message: 'please add card credentials', status: 400 });
  }

  const cards = await getSetCardsBySetId(setId, userId);
  if (!cards) {
    throw new AppError({ message: 'user is not authorized to view this set', status: 400 });
  }

  res.status(200).json({
    msg: 'success',
    cards: cards,
  });
});

export const viewCards = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.userId;
  const setId = req.params.setId;
  const { page } = req.query;

  if (!setId || typeof page !== 'number') {
    throw new AppError({ message: 'please add card credentials', status: 400 });
  }

  const card = await getCardsBySetIdWithPagination(setId, page, userId as string);

  if (card) {
    throw new AppError({ message: 'user is not authorized to view this set', status: 400 });
  }

  res.status(200).json({
    msg: 'success',
    card,
  });
});

export const addCard = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const { setId } = req.params;

  if (!setId || !userId) {
    throw new AppError({ message: 'please add card credentials', status: 400 });
  }
  const credentials = await CardFormSchema.parseAsync({
    term: req.body.term,
    definition: req.body.definition,
  });


  const [card] = await createCard({
    term: credentials.term,
    definition: credentials.definition,
    userId,
    setId: Number(setId),
  });

  if (!card) {
    throw new AppError({ message: 'Error creating card', status: 400 });
  }

  res.status(200).json({
    msg: 'Card Added!',
    card,
  });

}, 400);

export const getEditCard = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const setId = req.params.setId as string;
  const cardId = req.params.cardId as string;

  if (!setId || !cardId || !setId) {
    throw new AppError({ message: 'please add card credentials', status: 400 });
  }

  const [card] = await getCardBySetId(setId, userId)

  if (!card) {
    throw new AppError({ message: 'user is not authorized to edit this card', status: 400 });
  }

  res.status(200).json({
    setId,
    card,
  });
});

export const putEditCard = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.userId as string;
  const setId = req.params.setId as string;
  const cardId = req.params.cardId as string;

  const credentials = await CardFormSchema.parseAsync({
    term: req.body.term,
    definition: req.body.definition,
  });

  const [card] = await updateCard(
    {
      term: credentials.term,
      definition: credentials.definition
    },
    setId,
    cardId,
    userId,
  );

  if (!card) {
    throw new AppError({ message: 'Error updating card', status: 400 });
  }

  res.status(200).json({
    setId,
    card,
    msg: 'Card Updated!',
  });

}, 422);

export const putDeleteCard = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const cardId = req.params.cardId as string;

  const [card] = await deleteCard(cardId, userId);

  if (!card) {
    throw new AppError({ message: 'Error deleting card', status: 400 });
  }

  res.status(200).json({
    msg: 'Card Deleted!',
    card,
  });

});
