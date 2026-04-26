-- Migration for spaced repetition feature
-- Add columns to fc_cards table

ALTER TABLE fc_cards 
ADD COLUMN IF NOT EXISTS next_review_date TIMESTAMP DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS interval INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS ease_factor NUMERIC(3,2) DEFAULT 2.50,
ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_reviewed_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS rating_history VARCHAR(1000) DEFAULT '[]';