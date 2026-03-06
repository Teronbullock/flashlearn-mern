import { useCallback, useRef } from "react";
import { apiRequest } from "@lib/api";
import { useAuthContext } from "@feats/auth/context/AuthContext";

interface DeleteHandlerParams {
  setId?: number | undefined;
  cardId?: number | undefined;
}

export const useDeleteCard = (fetchCardResource: () => void) => {
  const { token } = useAuthContext();
  const tokenRef = useRef<string | null>(token);

  const deleteHandler = useCallback(
    async ({ setId, cardId }: DeleteHandlerParams): Promise<void> => {
      if (!tokenRef.current) {
        throw new Error("User is not authenticated to make this request.");
      }

      if (!setId || !fetchCardResource) {
        throw new Error("Error: couldn't fetch card info, missing auth info");
      }

      try {
        const res = await apiRequest({
          method: "delete",
          url: `/sets/${setId}/cards/${cardId}`,
          token: tokenRef.current,
        });

        if (!res.data) {
          throw new Error("Error: card not delete");
        }

        fetchCardResource();
      } catch (err) {
        console.error(err);
        // alert(err);
      }
    },
    [fetchCardResource],
  );

  return { deleteHandler };
};
