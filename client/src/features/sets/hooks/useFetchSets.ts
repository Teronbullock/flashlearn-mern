import { useEffect, useCallback, useRef, useState } from "react";
import { apiRequest } from "@/lib/api/api-request";
import { CardObject } from "@feats/sets/types/cardTypes";

interface FetchSetsParams {
  setId: string | undefined;
  token: string | null;
  userSlug?: string | null;
  options?: {
    skipSingleSet?: boolean;
    skipAllCards?: boolean;
  };
}

export const useFetchSets = ({
  setId,
  token,
  userSlug,
  options,
}: FetchSetsParams) => {
  const [set, setSet] = useState(null);
  const [setCards, setSetCards] = useState<CardObject[] | null>([]);
  const [error, setError] = useState<string | null>(null);

  const setControllerRef = useRef<AbortController | null>(null);
  const setCardsControllerRef = useRef<AbortController | null>(null);

  const fetchSingleSet = useCallback(async () => {
    if (!setId || !token || !userSlug) {
      throw new Error("Error: couldn't fetch card info, miss auth info");
    }

    if (setControllerRef.current) {
      setControllerRef.current.abort();
    }

    const controller = new AbortController();
    setControllerRef.current = controller;
    const signal = controller.signal;

    try {
      const res = await apiRequest({
        url: `/sets/${setId}`,
        token,
        signal: signal,
      });

      setSet(res.data.set);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        // setError(err.message);
        setSet(null);
      }
    } finally {
      if (setControllerRef.current === controller) {
        setControllerRef.current = null;
      }
    }
  }, [userSlug, setId, token]);

  const getAllSetCards = useCallback(async () => {
    if (!setId || !token) {
      return;
    }

    if (setCardsControllerRef.current) {
      setCardsControllerRef.current.abort();
    }

    const controller = new AbortController();
    setCardsControllerRef.current = controller;
    const signal = controller.signal;

    try {
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
      if (setCardsControllerRef.current === controller) {
        setCardsControllerRef.current = null;
      }
    }
  }, [token, setId]);

  useEffect(() => {
    if (options?.skipSingleSet) {
      return;
    }

    fetchSingleSet();

    return () => {
      if (setControllerRef.current) {
        setControllerRef.current.abort();
      }
    };
  }, [fetchSingleSet, options]);

  useEffect(() => {
    if (options?.skipAllCards) {
      return;
    }

    getAllSetCards();

    return () => {
      if (setCardsControllerRef.current) {
        setCardsControllerRef.current.abort();
      }
    };
  }, [getAllSetCards, options]);

  return { fetchSingleSet, set, setCards, getAllSetCards, error };
};
