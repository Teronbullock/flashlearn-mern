import { useEffect, useCallback, useRef, useState } from "react";
import { apiRequest } from "@/lib/api/api-request";

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
  const [error, setError] = useState<string | null>(null);

  const setControllerRef = useRef<AbortController | null>(null);

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

  return { fetchSingleSet, set, error };
};
