import { useEffect, useCallback, useRef, useState } from "react";
import { apiRequest } from "@/lib/api/api-request";
import { CardObject } from "@feats/sets/types/cardTypes";

interface FetchSetCardsParams {
  setId: string | undefined;
  token: string | null;
}

export const useFetchSetCards = ({ setId, token }: FetchSetCardsParams) => {
  const [setCards, setSetCards] = useState<CardObject[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const setCardsControllerRef = useRef<AbortController | null>(null);

  const getAllSetCards = useCallback(async () => {
    if (!setId || !token) {
      setError("Error: couldn't fetch card info, missing auth info");
      setLoading(false);
      return;
    }

    if (setCardsControllerRef.current) {
      setCardsControllerRef.current.abort();
    }

    const controller = new AbortController();
    setCardsControllerRef.current = controller;
    const signal = controller.signal;

    try {
      setLoading(true);
      const res = await apiRequest({
        url: `/sets/${setId}/cards`,
        token,
        signal: signal,
      });

      setSetCards(res.data.cards);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err.message);
        setSetCards(null);
      }
    } finally {
      setLoading(false);
      if (setCardsControllerRef.current === controller) {
        setCardsControllerRef.current = null;
      }
    }
  }, [token, setId]);

  useEffect(() => {
    getAllSetCards();

    return () => {
      if (setCardsControllerRef.current) {
        setCardsControllerRef.current.abort();
      }
    };
  }, [getAllSetCards]);

  return { setCards, getAllSetCards, loading, error };
};
