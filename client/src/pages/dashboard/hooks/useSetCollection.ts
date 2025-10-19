import { useState, useCallback, useMemo, useEffect } from "react";
import apiRequest from "@/lib/api";
import { useAuthContext } from "@hooks/useAuthContext";

interface SetData {
  id: number;
  user_id: number;
  title: string;
  description: string;
}

export const useSetCollection = () => {
  const { userSlug, token } = useAuthContext();
  const [sets, setSets] = useState<SetData[]>([]);

  const apiConfig = useMemo(
    () => ({ headers: { authorization: `Bearer ${token ?? ""}` } }),
    [token],
  );

  const getAllSetData = useCallback(async () => {
    try {
      if (!userSlug) return;

      const res = await apiRequest({
        url: `/api/set/user/${userSlug}`,
        config: apiConfig,
      });
      setSets(res.data.sets);
    } catch (err) {
      console.error("Error fetching sets:", err);
      setSets([]);
    }
  }, [userSlug, apiConfig]);

  useEffect(() => {
    getAllSetData();
  }, [getAllSetData]);

  return { sets, getAllSetData };
};
