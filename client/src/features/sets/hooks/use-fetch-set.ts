import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { apiRequest } from "@lib/api";
import { type SetSelectType } from "@flashlearn/schema-db";

interface RequestConfigParams {
  url: string;
  mode: "all" | "single";
}

interface FetchSetParams {
  setId?: string;
}

export const useFetchSet = ({ setId }: FetchSetParams) => {
  const { token } = useAuthContext();

  const [sets, setSets] = useState<SetSelectType[] | null>([]);
  const [set, setSet] = useState<SetSelectType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tokenRef = useRef<string | null>(null);

  const setControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  const requestConfig: RequestConfigParams = useMemo(() => {
    const isSingle = !!setId;

    return {
      url: isSingle ? `/sets/${setId}` : `/sets`,
      mode: isSingle ? "single" : "all",
    };
  }, [setId]);

  const fetchSetResource = useCallback(async () => {
    if (!tokenRef.current) {
      setError("User is not authenticated. Session missing.");
      return;
    }

    setIsLoading(true);

    if (setControllerRef.current) {
      setControllerRef.current.abort();
    }

    const controller = new AbortController();
    setControllerRef.current = controller;
    const signal = controller.signal;

    try {
      const res = await apiRequest({
        url: requestConfig.url,
        token: tokenRef.current,
        signal,
      });

      setIsLoading(false);

      if (!res.data) {
        setSets(null);
        setSet(null);
        throw new Error("Error fetching set resource");
      }

      if (requestConfig.mode === "all") {
        setSets(res.data.sets);
        return;
      }

      setSet(res.data.set);
    } catch (err) {
      setSets(null);
      setSet(null);
      console.error(err);

      if (err instanceof Error && err.name !== "AbortError") {
        setError("Error fetching set resource");
      }
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  }, [requestConfig.mode, requestConfig.url]);

  useEffect(() => {
    fetchSetResource();

    return () => {
      if (setControllerRef.current) {
        setControllerRef.current.abort();
      }
    };
  }, [fetchSetResource]);

  return { sets, set, error, isLoading, fetchSetResource };
};
