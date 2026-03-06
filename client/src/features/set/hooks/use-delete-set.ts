import { useCallback, useRef } from "react";
import { apiRequest } from "@lib/api";
import { useAuthContext } from "@feats/auth/context/AuthContext";

export const useDeleteSet = (fetchSetResource: () => void) => {
  const { token } = useAuthContext();
  const tokenRef = useRef<string | null>(token);

  const deleteHandler = useCallback(
    async (setId: number | undefined): Promise<void> => {
      if (!tokenRef.current) {
        throw new Error("User is not authenticated to make this request.");
      }

      if (!setId || !fetchSetResource) {
        throw new Error("Error: couldn't fetch card info, missing auth info");
      }

      try {
        const res = await apiRequest({
          method: "delete",
          url: `/sets/${setId}`,
          token: tokenRef.current,
        });

        if (!res.data) {
          throw new Error("Error: card not delete");
        }

        fetchSetResource();
      } catch (err) {
        console.error(err);
        // alert(err);
      }
    },
    [fetchSetResource],
  );

  return { deleteHandler };
};
