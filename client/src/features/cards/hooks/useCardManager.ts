import { useReducer, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { apiRequest } from "@lib/api/api-request";
import { setCardReducer, setCardReducerInitState } from "@/reducer";
import { CardObject } from "@feats/sets/types/cardTypes";
import { useAuthContext } from "@feats/auth/context/AuthContext";

interface CardManagerParams {
  setId?: string;
  cardId?: string;
  getAllSetCards?: () => void;
  card?: CardObject[] | null;
}

export const useCardManager = ({
  setId,
  cardId,
  getAllSetCards,
  card,
}: CardManagerParams) => {
  const navigate = useNavigate();
  const { token } = useAuthContext();

  const [state, dispatch] = useReducer(setCardReducer, setCardReducerInitState);

  const tokenRef = useRef(token);
  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  // add card handler
  // const addCardHandler = useCallback(
  //   async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();

  //     if (!tokenRef.current) {
  //       throw new Error("User is not authenticated, auth info missing.");
  //     }

  //     if (!setId) {
  //       throw new Error("set data missing");
  //     }

  //     try {
  //       const res = await apiRequest({
  //         method: "post",
  //         url: `/sets/${setId}/cards`,
  //         data: {
  //           term: state.inputOneValue,
  //           definition: state.inputTwoValue,
  //         },
  //         token: tokenRef.current,
  //       });

  //       if (res.data) {
  //         dispatch({ type: "SUBMIT" });
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       alert("Error creating card");
  //     }
  //   },
  //   [setId, state.inputOneValue, state.inputTwoValue],
  // );

  // edit card handler
  const editCardHandler = useCallback(async () => {
    if (!tokenRef.current) {
      throw new Error("User is not authenticated, auth info missing.");
    }

    if (!setId || !cardId) {
      throw new Error("data missing");
    }

    try {
      const res = await apiRequest({
        method: "put",
        url: `/sets/${setId}/cards/${cardId}`,
        data: {
          term: state.inputOneValue,
          definition: state.inputTwoValue,
        },
        token: tokenRef.current,
      });

      if (res.status === 200) {
        alert(res.data.msg);
        navigate(`/set/${setId}`);
      }
    } catch (error) {
      console.error(error);
      alert("Error updating card");
    }
  }, [setId, cardId, state.inputOneValue, state.inputTwoValue, navigate]);

  // delete card handler
  const deleteCardHandler = useCallback(
    async (cardId: string): Promise<void> => {
      if (!tokenRef.current) {
        throw new Error("auth info missing, user not authenticated");
      }

      if (!setId || !cardId) {
        throw new Error("set data missing");
      }

      if (!getAllSetCards) {
        throw new Error("Error: card not deleted");
      }

      try {
        const res = await apiRequest({
          method: "delete",
          url: `/sets/${setId}/cards/${cardId}`,
          token: tokenRef.current,
        });

        const { msg } = res.data;
        alert(msg);
        getAllSetCards();
      } catch (err) {
        console.error(err);
        alert("Error: card not deleted");
      }
    },
    [setId, getAllSetCards],
  );

  useEffect(() => {
    if (!card) return;

    dispatch({
      type: "ON_LOAD",
      payload: {
        inputOneValue: card[0].term,
        inputTwoValue: card[0].definition,
      },
    });
  }, [card]);

  return {
    state,
    dispatch,
    // addCardHandler,
    editCardHandler,
    deleteCardHandler,
  };
};
