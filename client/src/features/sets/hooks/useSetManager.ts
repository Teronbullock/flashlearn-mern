import { useReducer, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { apiRequest } from "@/lib/api/api-request";
import { setCardReducer, setCardReducerInitState } from "@/reducer";
import { SetObject } from "@feats/sets/types/setTypes";
import { useAuthContext } from "@feats/auth/context/AuthContext";

interface SetManagerParams {
  setId?: string;
  getAllSetCards?: () => void;
  set?: SetObject | null;
}

export const useSetManager = ({
  setId,
  getAllSetCards,
  set,
}: SetManagerParams) => {
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const tokenRef = useRef<string | null>(token);
  const [state, dispatch] = useReducer(setCardReducer, setCardReducerInitState);

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  const addSetHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!tokenRef.current) {
        throw new Error("User is not authenticated. Session missing.");
      }

      try {
        const res = await apiRequest({
          method: "post",
          url: `/sets/`,
          data: {
            title: state.inputOneValue,
            description: state.inputTwoValue,
          },
          token: tokenRef.current,
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
    [state.inputOneValue, state.inputTwoValue, navigate],
  );

  const editSetHandler = useCallback(async () => {
    if (!tokenRef.current) {
      throw new Error("User is not authenticated. Session missing.");
    }

    if (!setId) {
      throw new Error("Error: couldn't fetch card info, missing auth info");
    }

    try {
      const res = await apiRequest({
        method: "put",
        url: `/sets/${setId}`,
        data: {
          title: state.inputOneValue,
          description: state.inputTwoValue,
        },
        token: tokenRef.current,
      });

      if (res.status === 200) {
        alert(res.data.msg);
        navigate(`/dashboard`);
      }
    } catch (error) {
      console.error(error);
      alert("Error updating set");
    }
  }, [setId, state.inputOneValue, state.inputTwoValue, navigate]);

  const deleteSetCardHandler = useCallback(
    async ({
      cardId,
      setId,
    }: {
      cardId: string;
      setId: string;
    }): Promise<void> => {
      if (!tokenRef.current) {
        throw new Error("User is not authenticated. Session missing.");
      }

      if (!setId || !cardId) {
        throw new Error("Error: couldn't fetch card info, missing auth info");
      }

      if (!getAllSetCards) {
        throw new Error("Error: couldn't fetch card info.");
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
        alert("Error: card not delete");
      }
    },
    [getAllSetCards],
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
