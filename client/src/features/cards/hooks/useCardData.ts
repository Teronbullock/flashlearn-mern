import { useEffect, useState, useCallback, useRef } from "react";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { apiRequest } from "@/lib/api/api-request";
import { type CardType } from "../type/card-types";

interface UseCardDataParams {
  setId: string | undefined;
  cardId?: string | undefined;
  pageNum?: string | null;
}

// Convert pageNum (1-based string) to a 0-based index
const getCardIndex = (pageNum: string | null | undefined): number => {
  const page = parseInt(pageNum || "1", 10);
  return Math.max(0, page - 1);
};

export const useCardData = ({ setId, pageNum }: UseCardDataParams) => {
  const { token } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [count, setCount] = useState(0);
  const [list, setList] = useState<CardType[]>([]);

  const tokenRef = useRef<string | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  // Fetch ALL cards ONCE and cache them
  const fetchFullSet = useCallback(
    async (signal: AbortSignal) => {
      if (hasFetchedRef.current && list.length > 0) {
        setIsLoading(false);
        return;
      }

      if (!tokenRef.current) {
        setError("User is not authenticated, auth info missing.");
        setIsLoading(false);
        return;
      }

      if (!setId) {
        setError("Set data missing");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const res = await apiRequest({
          url: `/sets/${setId}/cards`,
          token: tokenRef.current,
          signal,
        });

        if (!signal.aborted) {
          setList(res.data.cards || []);
          setCount(res.data.cards?.length || 0);
          hasFetchedRef.current = true;
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
          setList([]);
          setCount(0);
          console.error("Card data fetch failed:", err);
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    [setId, list.length],
  );

  // Fetch on mount or when setId changes
  useEffect(() => {
    const controller = new AbortController();
    fetchFullSet(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchFullSet]);

  // Reset cache when setId changes
  useEffect(() => {
    hasFetchedRef.current = false;
    setList([]);
    setCount(0);
    setIsLoading(true);
  }, [setId]);

  const cardIndex = getCardIndex(pageNum);
  const currentCard = list[cardIndex] || null;

  return {
    card: currentCard,
    cardList: list,
    cardCount: count,
    isLoading,
    error,
    refetch: fetchFullSet,
  };
};
