import { useEffect, useCallback, useRef, useState } from "react";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { apiRequest } from "@/lib/api/api-request";
import { CardObject } from "@feats/sets/types/cardTypes";

interface FetchSetCardsParams {
  setId: string | undefined;
}

export const useFetchSetCards = ({ setId }: FetchSetCardsParams) => {
  const { token } = useAuthContext();

  const [setCards, setSetCards] = useState<CardObject[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const setCardsControllerRef = useRef<AbortController | null>(null);

  const tokenRef = useRef<string | null>(token);
  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  const getAllSetCards = useCallback(async () => {
    if (!tokenRef.current) {
      setError("User is not authenticated. Session missing.");
      setLoading(false);
      return;
    }

    if (!setId) {
      setError("Error: couldn't fetch card info.");
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
        token: tokenRef.current,
        signal: signal,
      });

      setSetCards(res.data.cards);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err.message);
        setSetCards(null);
      }
    } finally {
      if (setCardsControllerRef.current === controller) {
        setCardsControllerRef.current = null;
        setLoading(false);
      }
    }
  }, [setId]);

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
