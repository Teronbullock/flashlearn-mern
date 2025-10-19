import { useState, useCallback, useEffect, useMemo } from "react";
import apiRequest from "@/lib/api";
import { useAuthContext } from "@hooks/useAuthContext";

export interface SetData {
  id: number;
  user_id: number;
  title: string;
  description: string;
}

interface UseSetDataOptions {
  isGetSets?: boolean;
}

export const useSetData = ({ isGetSets = false }: UseSetDataOptions = {}) => {
  const { userSlug, token } = useAuthContext();
  const [sets, setSets] = useState<SetData[]>([]);

  const apiConfig = useMemo(
    () => ({
      headers: { authorization: `Bearer ${token}` },
    }),
    [token],
  );

  const getSetData = useCallback(async () => {
    try {
      const res = await apiRequest({
        url: `/api/set/user/${userSlug}`,
        config: apiConfig,
      });
      setSets(res.data.sets);
    } catch (err) {
      console.error(err);
      setSets([]);
    }
  }, [userSlug, apiConfig]);

  const deleteSetHandler = useCallback(
    async (setId: number) => {
      try {
        const res = await apiRequest({
          method: "delete",
          url: `/api/set/user/${userSlug}/${setId}/delete`,
          config: apiConfig,
        });
        alert(res.data.msg);
        getSetData();
      } catch (err) {
        console.error(err);
      }
    },
    [userSlug, apiConfig, getSetData],
  );

  useEffect(() => {
    if (isGetSets) getSetData();
  }, [isGetSets, getSetData]);

  return { sets, getSetData, deleteSetHandler };
};
