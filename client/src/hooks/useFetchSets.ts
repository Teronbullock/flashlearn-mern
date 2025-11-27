import { useCallback, useEffect, useState, useMemo } from "react";
import { apiRequest } from "@/lib/api/api-request";
import { useAuthContext } from "@feats/auth/context/AuthContext";

interface SetData {
  id: number;
  user_id: number;
  title: string;
  description: string;
}

export const useFetchSets = () => {
  const { userId, userSlug, token } = useAuthContext();
  const [sets, setSets] = useState<SetData[]>([]);

  // Get Set Data
  const getSetData = useCallback(async () => {
    try {
      if (!userSlug || !token) {
        setSets([]);
        return;
      }

      const res = await apiRequest({
        url: `/set/user/${userSlug}`,
        config: {
          token,
        },
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
  }, [userSlug, token]);

  // useEffect for fetching set functions
  useEffect(() => {
    getSetData();
  }, [token, userId, getSetData]);

  return {
    getSetData,
    sets,
  };
};
