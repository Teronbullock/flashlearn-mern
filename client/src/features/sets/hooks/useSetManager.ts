import { useReducer, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { apiRequest } from "@/lib/api/api-request";
import { setCardReducer, setCardReducerInitState } from "@/reducer";
import { SetObject } from "@feats/sets/types/setTypes";

interface SetManagerParams {
  setId?: string;
  getAllSetCards?: () => void;
  token?: string | null;
  set?: SetObject | null;
}

export const useSetManager = ({
  setId,
  getAllSetCards,
  token,
  set,
}: SetManagerParams) => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(setCardReducer, setCardReducerInitState);

  // add set handler
  const addSetHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        if (!token) {
          throw new Error("User is not authenticated. Session missing.");
        }

        const res = await apiRequest({
          method: "post",
          url: `/sets/`,
          data: {
            title: state.inputOneValue,
            description: state.inputTwoValue,
          },
          token,
        });

        if (res.data) {
          dispatch({ type: "SUBMIT" });
          navigate(`/dashboard`);
        }
      } catch (error) {
        console.error(error);
        alert("Error creating set");
      }
    },
    [token, state.inputOneValue, state.inputTwoValue, navigate],
  );

  // edit set handler
  const editSetHandler = useCallback(async () => {
    if (!setId || !token) return;

    try {
      const res = await apiRequest({
        method: "put",
        url: `/sets/${setId}`,
        data: {
          title: state.inputOneValue,
          description: state.inputTwoValue,
        },
        token,
      });

      if (res.status === 200) {
        alert(res.data.msg);
        navigate(`/dashboard`);
      }
    } catch (error) {
      console.error(error);
      alert("Error updating set");
    }
  }, [setId, token, state.inputOneValue, state.inputTwoValue, navigate]);

  //
  const deleteSetCardHandler = useCallback(
    async ({
      cardId,
      setId,
    }: {
      cardId: string;
      setId: string;
    }): Promise<void> => {
      if (!setId || !cardId || !token || !getAllSetCards) {
        throw new Error("Error: card not delete");
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
        alert("Error: card not delete");
      }
    },
    [token, getAllSetCards],
  );

  useEffect(() => {
    if (!set) return;

    dispatch({
      type: "ON_LOAD",
      payload: { inputOneValue: set.title, inputTwoValue: set.description },
    });
  }, [set]);

  return {
    state,
    dispatch,
    addSetHandler,
    editSetHandler,
    deleteSetCardHandler,
  };
};
