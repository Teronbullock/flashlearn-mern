import { useCallback, useEffect, useState, useMemo } from "react";
import apiRequest from "@/lib/api";
import { useAuthContext } from "@hooks/useAuthContext";

interface SetData {
  id: number;
  user_id: number;
  title: string;
  description: string;
}

export const useFetchSets = () => {
  const { userId, userSlug, token } = useAuthContext();
  const [sets, setSets] = useState<SetData[]>([]);

  // api Config
  const apiConfig = useMemo(
    () => ({
      headers: { authorization: `Bearer ${token}` },
    }),
    [token],
  );

  // Get Set Data
  const getSetData = useCallback(async () => {
    try {
      const res = await apiRequest({
        url: `/api/set/user/${userSlug}`,
        config: apiConfig,
        data: {
          userSlug,
          token,
        },
      });

      // add sets to state
      setSets(res.data.sets);
    } catch (err) {
      console.error(err);
      setSets([]);
      throw err;
    }
  }, [userSlug, token, apiConfig]);

  // useEffect for fetching set functions
  useEffect(() => {
    getSetData();
  }, [token, userId, getSetData]);

  return {
    getSetData,
    sets,
  };
};
