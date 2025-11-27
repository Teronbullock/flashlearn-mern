import { useState, useCallback } from "react";

interface UseCardFlipReturn {
  isFlipped: boolean;
  handleFlip: () => void;
  resetFlip: () => void;
}

export const useCardFlip = (): UseCardFlipReturn => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const resetFlip = useCallback(() => {
    setIsFlipped(false);
  }, []);

  return {
    isFlipped,
    handleFlip,
    resetFlip,
  };
};
