import { useEffect, useCallback, useRef, useState } from "react";
import { apiRequest } from "@/lib/api/api-request";
import { useAuthContext } from "@feats/auth/context/AuthContext";

interface FetchSetsParams {
  setId: string | undefined;
}

export const useFetchSets = ({ setId }: FetchSetsParams) => {
  const [set, setSet] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const setControllerRef = useRef<AbortController | null>(null);

  const { token } = useAuthContext();
  const tokenRef = useRef<string | null>(token);
  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  const fetchSingleSet = useCallback(async () => {
    if (!tokenRef.current) {
      throw new Error("User is not authenticated. Session missing.");
    }

    if (!setId) {
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
        token: tokenRef.current,
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
  }, [setId]);

  useEffect(() => {
    fetchSingleSet();

    return () => {
      if (setControllerRef.current) {
        setControllerRef.current.abort();
      }
    };
  }, [fetchSingleSet]);

  return { fetchSingleSet, set, error };
};
