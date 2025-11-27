import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { apiRequest } from "@lib/api";

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

  const getAllSets = useCallback(
    async (signal?: AbortSignal) => {
      if (!userSlug || !token) {
        return;
      }

      try {
        const res = await apiRequest({
          url: `/sets`,
          token,
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
      }
    },
    [userSlug, token],
  );

  const deleteSetHandler = useCallback(
    async (setId: number) => {
      if (!setId || !userSlug || !token) return;

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
    [userSlug, token, getAllSets],
  );

  useEffect(() => {
    const controller = new AbortController();
    getAllSets(controller.signal);

    return () => {
      controller.abort();
    };
  }, [getAllSets]);

  return { sets, deleteSetHandler, error };
};
