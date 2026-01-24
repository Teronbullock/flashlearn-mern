import { useState, useEffect, useCallback, useRef } from "react";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { apiRequest } from "@lib/api";

interface SetData {
  id: number;
  user_id: number;
  title: string;
  description: string;
}

export const useDashboardSets = () => {
  const { token } = useAuthContext();

  const [sets, setSets] = useState<SetData[] | null>([]);
  const [isLoadingSets, setIsLoadingSets] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tokenRef = useRef<string | null>(null);
  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  const getAllSets = useCallback(async (signal?: AbortSignal) => {
    if (!tokenRef.current) {
      return;
    }

    setIsLoadingSets(true);
    try {
      const res = await apiRequest({
        url: `/sets`,
        token: tokenRef.current,
        signal,
      });

      if (!res) {
        setSets(null);
        return;
      }

      setSets(res.data.sets);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err.message);
        setSets(null);
      }
    } finally {
      if (!signal?.aborted) {
        setIsLoadingSets(false);
      }
    }
  }, []);

  const deleteSetHandler = useCallback(
    async (setId: number) => {
      if (!setId || !token) return;

      try {
        const res = await apiRequest({
          method: "delete",
          url: `/sets/${setId}`,
          token,
        });
        alert(res.data.msg);
        getAllSets();
      } catch (err) {
        console.error("Error deleting set:", err);
      }
    },
    [token, getAllSets],
  );

  useEffect(() => {
    const controller = new AbortController();
    getAllSets(controller.signal);

    return () => {
      controller.abort();
    };
  }, [getAllSets]);

  return { sets, deleteSetHandler, error, isLoadingSets };
};
