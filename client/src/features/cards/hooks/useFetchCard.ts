import { useEffect, useCallback, useRef, useState } from "react";
import { apiRequest } from "@/lib/api/api-request";
import { useAuthContext } from "@feats/auth/context/AuthContext";

interface FetchCardsParams {
  setId: string | undefined;
  cardId: string | undefined;
}

export const useFetchCard = ({ setId, cardId }: FetchCardsParams) => {
  const [card, setCard] = useState(null);

  const activeControllerRef = useRef<AbortController | null>(null);

  const { token } = useAuthContext();
  const tokenRef = useRef(token);
  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  const fetchCard = useCallback(async () => {
    if (!tokenRef.current) {
      throw new Error("Auth info missing, user not authenticated");
    }

    if (!setId || !cardId) {
      throw new Error(" data missing, card not found");
    }

    if (activeControllerRef.current) {
      activeControllerRef.current.abort();
    }

    const controller = new AbortController();
    activeControllerRef.current = controller;
    const signal = controller.signal;

    try {
      const res = await apiRequest({
        url: `/sets/${setId}/cards`,
        token: tokenRef.current,
        signal: signal,
      });

      setCard(res.data.cards);
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
  }, [setId, cardId]);

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
