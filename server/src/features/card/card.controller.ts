import { type Response, type Request } from 'express';
import { type AuthRequest } from '../../types';
import { CardFormSchema, CardRatingSchema } from '@flashlearn/schema-db';
import { asyncHandler } from '../../middleware/asyncHandler.js';
import {
  getCardListBySetId,
  getCardsBySetIdWithPagination,
  updateCard,
  createCard,
  deleteCard,
  getCardBySetIdAndCardId,
  updateCardAfterReview
} from './card.dal';
import { AppError } from '../../lib/AppError';
import { calculateNextReview, getNextReviewDate } from './spaced-repetition.service.js';


export const getCards = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  let setId = req.params.setId as string;

  if (!setId || !userId) {
    throw new AppError({ message: 'please add card credentials', status: 400 });
  }

  const cards = await getCardListBySetId({ setId, userId });
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

  const card = await getCardsBySetIdWithPagination({ setId, page, userId: userId as string });

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

  const [card] = await getCardBySetIdAndCardId({ setId, userId, cardId })

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

  const [card] = await updateCard({
    term: credentials.term,
    definition: credentials.definition,
    setId,
    cardId,
    userId,
  });

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

  const [card] = await deleteCard({ cardId, userId });

  if (!card) {
    throw new AppError({ message: 'Error deleting card', status: 400 });
  }

  res.status(200).json({
    msg: 'Card Deleted!',
    card,
  });

});

// Handle card review for spaced repetition
export const reviewCard = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.userId as string;
  const setId = req.params.setId as string;
  const cardId = req.params.cardId as string;
  
  // Validate rating input
  const { rating } = await CardRatingSchema.parseAsync(req.body);
  
  // Get the current card data
  const [card] = await getCardBySetIdAndCardId({ setId, userId, cardId });
  
  if (!card) {
    throw new AppError({ message: 'Card not found', status: 404 });
  }
  
  // Calculate next review date based on rating
  const { nextInterval, nextEaseFactor } = calculateNextReview(
    {
      interval: card.interval ?? 1,
      easeFactor: card.easeFactor ?? 2.5,
      reviewCount: card.reviewCount ?? 0
    },
    rating
  );
  
  const nextReviewDate = getNextReviewDate(nextInterval);
  
  // Update card with new spaced repetition data
  const [updatedCard] = await updateCardAfterReview({
    cardId: card.id,
    userId,
    rating,
    nextReviewDate,
    interval: nextInterval,
    easeFactor: nextEaseFactor,
    reviewCount: (card.reviewCount ?? 0) + 1,
    lastReviewedAt: new Date()
  });
  
  if (!updatedCard) {
    throw new AppError({ message: 'Error updating card', status: 400 });
  }
  
  res.status(200).json({
    msg: 'Card reviewed successfully!',
    card: updatedCard,
    nextReviewDate,
    interval: nextInterval
  });
});
