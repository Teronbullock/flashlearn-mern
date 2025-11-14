import { useState, useCallback, useEffect, useMemo } from "react";
import { apiRequest } from "@/lib/api/api-request";
import { useAuthContext } from "@/hooks/index";

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

  const deleteSetHandler = useCallback(
    async (setId: number) => {
      try {
        const res = await apiRequest({
          method: "delete",
          url: `/api/set/user/${userSlug}/${setId}/delete`,
          config: apiConfig,
        });
        alert(res.data.msg);
        // getSetData();
      } catch (err) {
        console.error(err);
      }
    },
    [userSlug, apiConfig],
  );

  useEffect(() => {
    const getSetData = async () => {
      try {
        const res = await apiRequest({
          url: `/api/set/user/${userSlug}`,
          config: apiConfig,
        });

        if (!res) {
          throw new Error("No response from server");
        }

        setSets(res.data.sets);
      } catch (err) {
        console.error(err);
        setSets([]);
      }
    };

    if (isGetSets) getSetData();
  }, [isGetSets]);

  return { sets, deleteSetHandler };
};
