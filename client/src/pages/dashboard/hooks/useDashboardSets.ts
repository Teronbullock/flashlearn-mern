import { useState, useMemo, useEffect } from "react";
import { getApiConfig, fetchAllSets } from "@lib/api";
import { useAuthContext } from "@/hooks/index";

interface SetData {
  id: number;
  user_id: number;
  title: string;
  description: string;
}

export const useDashboardSets = () => {
  const { userSlug, token } = useAuthContext();
  const [sets, setSets] = useState<SetData[] | null>([]);
  const [error, setError] = useState<string | null>(null);

  if (!token) {
    throw new Error("Token is required to fetch sets");
  }

  // This memoizes the obj returned by getApiConfig.
  const apiConfig = useMemo(() => getApiConfig(token), [token]);

  useEffect(() => {
    const getAllSetData = async (signal: AbortSignal) => {
      if (!userSlug) return;

      try {
        const res = await fetchAllSets({ userSlug, signal, apiConfig });

        if (!res) {
          setSets(null);
          return;
        }

        setSets(res.sets);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
          setSets(null);
        }
      }
    };

    const controller = new AbortController();
    getAllSetData(controller.signal);

    return () => {
      controller.abort();
    };
  }, [userSlug, apiConfig]);

  return { sets, error };
};
