import { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { apiRequest } from "@/lib/api/api-request";
import { CardData } from "@app-types/cardType";

interface CardDataState {
  card: CardData | null;
  list: CardData[];
  count: number;
  isLoading: boolean;
  error: string | null;
}

interface UseCardDataParams {
  setId: string | undefined;
  cardId?: string | undefined;
  pageNum?: string | null;
}

// convert pageNum (1-based string) to a 0-based index
const getCardIndex = (pageNum: string | null | undefined): number => {
  const page = parseInt(pageNum || "1", 10);
  return Math.max(0, page - 1);
};

export const useCardData = ({ setId, pageNum }: UseCardDataParams) => {
  const { token } = useAuthContext();
  const [state, setState] = useState<CardDataState>({
    card: null,
    list: [],
    count: 0,
    isLoading: false,
    error: null,
  });

  // Fetch ALL Cards
  const fetchFullSet = useCallback(
    async (signal: AbortSignal) => {
      if (!token || !setId || state.list.length > 0) {
        setState((s) => ({ ...s, isLoading: false }));
        return;
      }

      setState((s) => ({ ...s, isLoading: true, error: null }));

      try {
        const res = await apiRequest({
          url: `/sets/${setId}/cards`,
          token,
          signal,
        });

        setState((s) => ({
          ...s,
          list: res.data.cards || [],
          count: res.data.cards.length || 0,
        }));
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setState((s) => ({
            ...s,
            error: err.message,
            card: null,
            list: [],
            count: 0,
          }));
          console.error("Card data fetch failed:", err);
        }
      } finally {
        setState((s) => ({ ...s, isLoading: false }));
      }
    },
    [setId, token, state.list.length],
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchFullSet(controller.signal);
    return () => controller.abort();
  }, [fetchFullSet]);

  // get current card
  const cardIndex = getCardIndex(pageNum);
  const currentCard = state.list[cardIndex] || null;

  return {
    card: currentCard,
    cardList: state.list,
    cardCount: state.count,
    isLoading: state.isLoading,
    error: state.error,
  };
};
