import { useEffect, useCallback, useRef, useState } from "react";
import { apiRequest } from "@/lib/api/api-request";

interface FetchCardsParams {
  setId: string | undefined;
  token: string | null;
  cardId: string | undefined;
}

export const useFetchCard = ({ setId, token, cardId }: FetchCardsParams) => {
  const [card, setCard] = useState(null);

  const activeControllerRef = useRef<AbortController | null>(null);

  const fetchCard = useCallback(async () => {
    if (!setId || !token) {
      throw new Error("Error: couldn't fetch card info, miss auth info");
    }

    if (activeControllerRef.current) {
      activeControllerRef.current.abort();
    }

    const controller = new AbortController();
    activeControllerRef.current = controller;
    const signal = controller.signal;

    try {
      const res = await apiRequest({
        url: `/sets/${setId}/cards/${cardId}`,
        token,
        signal: signal,
      });

      setCard(res.data.card);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        // setError(err.message);
        setCard(null);
      }
    } finally {
      if (activeControllerRef.current === controller) {
        activeControllerRef.current = null;
      }
    }
  }, [setId, token, cardId]);

  useEffect(() => {
    fetchCard();

    return () => {
      if (activeControllerRef.current) {
        activeControllerRef.current.abort();
      }
    };
  }, [fetchCard]);

  return { card };
};
