import { useReducer, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiRequest } from "@lib/api/api-request";
import { setCardReducer, setCardReducerInitState } from "@/reducer";
import { CardObject } from "@feats/sets/types/cardTypes";

interface CardManagerParams {
  setId?: string;
  cardId?: string;
  getAllSetCards?: () => void;
  userSlug?: string | null;
  token?: string | null;
  card?: CardObject | null;
}

export const useCardManager = ({
  setId,
  cardId,
  getAllSetCards,
  userSlug,
  token,
  card,
}: CardManagerParams) => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(setCardReducer, setCardReducerInitState);

  // add card handler
  const addCardHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        if (!token || !setId) {
          throw new Error("User is not authenticated or setId missing.");
        }

        const res = await apiRequest({
          method: "post",
          url: `/sets/${setId}/cards`,
          data: {
            term: state.inputOneValue,
            definition: state.inputTwoValue,
          },
          token,
        });

        if (res.data) {
          dispatch({ type: "SUBMIT" });
        }
      } catch (error) {
        console.error(error);
        alert("Error creating card");
      }
    },
    [setId, token, state.inputOneValue, state.inputTwoValue],
  );

  // edit card handler
  const editCardHandler = useCallback(async () => {
    if (!setId || !cardId || !token) return;

    try {
      const res = await apiRequest({
        method: "put",
        url: `/sets/${setId}/cards/${cardId}`,
        data: {
          term: state.inputOneValue,
          definition: state.inputTwoValue,
        },
        token,
      });

      if (res.status === 200) {
        alert(res.data.msg);
        navigate(`/set/${setId}`);
      }
    } catch (error) {
      console.error(error);
      alert("Error updating card");
    }
  }, [
    setId,
    cardId,
    token,
    state.inputOneValue,
    state.inputTwoValue,
    navigate,
  ]);

  // delete card handler
  const deleteCardHandler = useCallback(
    async (cardId: string): Promise<void> => {
      if (!setId || !cardId || !token || !getAllSetCards) {
        throw new Error("Error: card not deleted");
      }
      try {
        const res = await apiRequest({
          method: "delete",
          url: `/sets/${setId}/cards/${cardId}`,
          token,
        });

        const { msg } = res.data;
        alert(msg);
        getAllSetCards();
      } catch (err) {
        console.error(err);
        alert("Error: card not deleted");
      }
    },
    [setId, token, getAllSetCards],
  );

  useEffect(() => {
    if (!card) return;

    dispatch({
      type: "ON_LOAD",
      payload: { inputOneValue: card.term, inputTwoValue: card.definition },
    });
  }, [card]);

  return {
    state,
    dispatch,
    addCardHandler,
    editCardHandler,
    deleteCardHandler,
  };
};
