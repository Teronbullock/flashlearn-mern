import { useEffect, useCallback, useRef, useState, useMemo } from "react";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { apiRequest } from "@/lib/api/api-request";
import { type CardSelectType } from "@flashlearn/schema-db";

interface RequestConfigParams {
  url: string;
  mode: "all" | "single";
}

interface FetchCardParams {
  cardId?: string;
  setId?: string;
}

export const useFetchCards = ({ cardId, setId }: FetchCardParams) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cards, setCards] = useState<CardSelectType[] | null>([]);
  const [card, setCard] = useState<CardSelectType | null>(null);

  const { token } = useAuthContext();

  const cardsControllerRef = useRef<AbortController | null>(null);
  const tokenRef = useRef<string | null>(token);

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  const requestConfig: RequestConfigParams = useMemo(() => {
    const isSingle = !!cardId;

    return {
      url: isSingle ? `/sets/${setId}/cards/${cardId}` : `/sets/${setId}/cards`,
      mode: isSingle ? "single" : "all",
    };
  }, [setId, cardId]);

  const fetchCardResource = useCallback(async () => {
    if (!tokenRef.current) {
      setError("User is not authenticated. Session missing.");
      return;
    }

    setIsLoading(true);

    if (cardsControllerRef.current) {
      cardsControllerRef.current.abort();
    }

    const controller = new AbortController();
    cardsControllerRef.current = controller;
    const signal = controller.signal;

    try {
      const res = await apiRequest({
        url: requestConfig.url,
        token: tokenRef.current,
        signal: signal,
      });

      setIsLoading(false);

      if (!res.data) {
        setCards(null);
        setCard(null);
        throw new Error("Error fetching card resource");
      }
      if (requestConfig.mode === "all") {
        setCards(res.data.cards);
        return;
      }

      setCard(res.data.card);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err.message);
        setCards(null);
        setCard(null);
      }
    } finally {
      if (cardsControllerRef.current === controller) {
        cardsControllerRef.current = null;
        setIsLoading(false);
      }
    }
  }, [requestConfig.mode, requestConfig.url]);

  useEffect(() => {
    fetchCardResource();

    return () => {
      if (cardsControllerRef.current) {
        cardsControllerRef.current.abort();
      }
    };
  }, [fetchCardResource]);

  return { card, cards, error, isLoading, fetchCardResource };
};
