export interface CardObject {
  id: string;
  setId: string;
  userId: string;
  term: string;
  definition: string;
  createdAt: string;
  // Spaced repetition fields
  nextReviewDate?: string;
  interval?: number;
  easeFactor?: number;
  reviewCount?: number;
  lastReviewedAt?: string;
  ratingHistory?: string;
}
