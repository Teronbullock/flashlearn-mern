import { useReducer, useCallback, useMemo } from "react";
import apiRequest from "@/lib/api";
import { useNavigate } from "react-router";
import { useAuthContext } from "@/hooks/index";

interface SetReducerState {
  inputOneValue: string;
  inputTwoValue: string;
}

type ActionType =
  | { type: "ON_LOAD"; payload: Partial<SetReducerState> }
  | { type: "ON_INPUT_ONE_CHANGE"; payload: string }
  | { type: "ON_INPUT_TWO_CHANGE"; payload: string }
  | { type: "SUBMIT" };

type GetSetDataFunction = () => Promise<void>;

const setReducer = (
  state: SetReducerState,
  action: ActionType,
): SetReducerState => {
  switch (action.type) {
    case "ON_LOAD":
      return { ...state, ...action.payload };
    case "ON_INPUT_ONE_CHANGE":
      return { ...state, inputOneValue: action.payload };
    case "ON_INPUT_TWO_CHANGE":
      return { ...state, inputTwoValue: action.payload };
    case "SUBMIT":
      return { inputOneValue: "", inputTwoValue: "" };
    default:
      return state;
  }
};

export const useSetActions = () =>
  // setId: string,
  // getSetData: GetSetDataFunction,
  {
    const navigate = useNavigate();
    const { userSlug, token } = useAuthContext();

    const [state, dispatch] = useReducer(setReducer, {
      inputOneValue: "",
      inputTwoValue: "",
    });

    const apiConfig = useMemo(
      () => ({
        headers: { authorization: `Bearer ${token ?? ""}` },
      }),
      [token],
    );

    const editSetHandler = useCallback(
      async (e: React.FormEvent<HTMLFormElement>, setId: number) => {
        e.preventDefault();
        if (!setId) return;

        try {
          const res = await apiRequest({
            method: "put",
            url: `/api/set/${userSlug}/${setId}/edit`,
            data: {
              title: state.inputOneValue,
              description: state.inputTwoValue,
            },
            config: apiConfig,
          });

          if (res.status === 200) {
            alert(res.data.msg);
            navigate(`/${userSlug}/dashboard`);
          }
        } catch (error) {
          console.error(error);
          alert("Error updating set");
        }
      },
      [userSlug, apiConfig, state.inputOneValue, state.inputTwoValue, navigate],
    );

    // Delete Set Handler
    const deleteSetHandler = useCallback(
      async (e: React.FormEvent<HTMLFormElement>, setId: number) => {
        e.preventDefault();

        if (setId && userSlug) {
          try {
            console.log("config", apiConfig);
            const res = await apiRequest({
              method: "delete",
              url: `/api/set/user/${userSlug}/${setId}/delete`,
              config: apiConfig,
            });
            const { msg } = res.data;
            alert(msg);
            getSetData();
          } catch (err) {
            console.error(err);
          }
        }
      },
      [userSlug, apiConfig, getSetData],
    );

    return { state, dispatch, editSetHandler, deleteSetHandler };
  };
