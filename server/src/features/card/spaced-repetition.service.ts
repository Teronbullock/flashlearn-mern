import { type CardSelectType } from '@flashlearn/schema-db';

/**
 * Calculate the next review date based on the spaced repetition algorithm
 * 
 * This implements a variant of the SM-2 algorithm used by Anki:
 * - New cards start with 1 day interval
 * - "Again" resets to 1 day interval
 * - "Hard" reduces interval by 15%
 * - "Good" keeps interval same
 * - "Easy" increases interval by 1.7x and adjusts ease factor
 */
export const calculateNextReview = (
  card: Pick<CardSelectType, 'interval' | 'easeFactor' | 'reviewCount'>,
  rating: 'again' | 'hard' | 'good' | 'easy'
): { nextInterval: number; nextEaseFactor: number } => {
  let { interval, easeFactor, reviewCount } = card;
  
  // Initialize defaults for new cards
  if (interval === undefined || interval === null) interval = 1;
  if (easeFactor === undefined || easeFactor === null) easeFactor = 2.5;
  if (reviewCount === undefined || reviewCount === null) reviewCount = 0;
  
  let nextInterval = interval;
  let nextEaseFactor = easeFactor;
  
  switch (rating) {
    case 'again':
      // Reset interval to 1 day, slightly reduce ease factor
      nextInterval = 1;
      nextEaseFactor = Math.max(1.3, easeFactor - 0.2);
      break;
      
    case 'hard':
      // Reduce interval by 15%, slightly reduce ease factor
      nextInterval = Math.max(1, interval * 0.85);
      nextEaseFactor = Math.max(1.3, easeFactor - 0.15);
      break;
      
    case 'good':
      // Keep current interval, slight increase in ease factor
      nextInterval = interval;
      nextEaseFactor = easeFactor + 0.1;
      break;
      
    case 'easy':
      // Increase interval significantly, increase ease factor
      nextInterval = interval * easeFactor;
      nextEaseFactor = easeFactor + 0.15;
      break;
  }
  
  // Ensure minimum ease factor
  nextEaseFactor = Math.max(1.3, nextEaseFactor);
  
  return {
    nextInterval: Math.round(nextInterval * 100) / 100, // Round to 2 decimal places
    nextEaseFactor: Math.round(nextEaseFactor * 100) / 100
  };
};

/**
 * Get the next review date based on the calculated interval
 */
export const getNextReviewDate = (daysFromNow: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

/**
 * Get cards that are due for review
 */
export const getCardsForReview = (cards: CardSelectType[]): CardSelectType[] => {
  const now = new Date();
  return cards.filter(card => {
    if (!card.nextReviewDate) return true; // New cards are always due
    return new Date(card.nextReviewDate) <= now;
  });
};