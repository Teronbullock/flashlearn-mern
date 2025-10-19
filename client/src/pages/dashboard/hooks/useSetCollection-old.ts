import { useReducer, useEffect, useCallback, useState, useMemo } from "react";
import { useNavigate } from "react-router";
import apiRequest from "@/lib/api";
import { useAuthContext } from "@hooks/useAuthContext";

interface SetReducerState {
  inputOneValue?: string;
  inputTwoValue?: string;
}

interface SetReducerAction {
  type: "ON_INPUT_ONE_CHANGE" | "ON_INPUT_TWO_CHANGE" | "ON_LOAD" | "SUBMIT";
  payload: SetReducerState;
}

interface SetData {
  id: number;
  user_id: number;
  title: string;
  description: string;
}

interface ManageSetData {
  isEditSet?: boolean | undefined;
  isGetSets?: boolean | undefined;
  setId?: string | undefined;
}

const SetReducer = (state: SetReducerState, action: SetReducerAction) => {
  switch (action.type) {
    case "ON_LOAD":
      return { ...state, ...action.payload };
    case "ON_INPUT_ONE_CHANGE":
      return { ...state, inputOneValue: action.payload.inputOneValue };
    case "ON_INPUT_TWO_CHANGE":
      return { ...state, inputTwoValue: action.payload.inputTwoValue };
    case "SUBMIT":
      return { ...state, inputOneValue: "", inputTwoValue: "" };
    default:
      return state;
  }
};

const useSetCollection = ({
  isEditSet = false,
  isGetSets = false,
  setId,
}: ManageSetData = {}) => {
  const navigate = useNavigate();
  const { userId, userSlug, token } = useAuthContext();
  const [sets, setSets] = useState<SetData[]>([]);
  const [state, dispatch] = useReducer(SetReducer, {
    inputOneValue: "",
    inputTwoValue: "",
  });

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

  // Add Set handler
  const addSetHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const res = await apiRequest({
          method: "post",
          url: `/api/set/user/${userSlug}/add`,
          data: {
            title: state.inputOneValue,
            description: state.inputTwoValue,
          },
          config: apiConfig,
        });

        if (res.data) {
          dispatch({ type: "SUBMIT", payload: {} });
          navigate(`/${userSlug}/dashboard`);
        }
      } catch (error) {
        console.error(error);
        alert(error);
      }
    },
    [userSlug, apiConfig, state.inputOneValue, state.inputTwoValue],
  );

  // Edit Set Handler
  const editSetHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const res = await apiRequest({
          method: "put",
          url: `/api/set/${userSlug}/${setId}/edit`,
          data: {
            title: state.inputOneValue,
            description: state.inputTwoValue,
            id: setId,
            userSlug,
          },
          config: apiConfig,
        });

        if (res.data && res.status === 200) {
          const { msg } = res.data;
          alert(msg);
          navigate(`/${userSlug}/dashboard`);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }
        alert(`Error updating set, ${error}`);
      }
    },
    [userSlug, setId, apiConfig, state.inputOneValue, state.inputTwoValue],
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

  // useEffect for edit set functions
  useEffect(() => {
    if (isEditSet) {
      const fetchData = async () => {
        try {
          const res = await apiRequest({
            url: `/api/set/${userSlug}/${setId}/edit`,
            config: apiConfig,
          });

          const { title, description } = res.data.set;
          dispatch({
            type: "ON_LOAD",
            payload: {
              inputOneValue: title,
              inputTwoValue: description,
            },
          });
          return;
        } catch (err) {
          console.error("Error: retrieving set", err);
          alert("Error: retrieving set");
          navigate(`/${userSlug}/dashboard`);
        }
      };

      fetchData();
    }
  }, [setId, userSlug, token, isEditSet, apiConfig, navigate]);

  // useEffect for fetching set functions
  useEffect(() => {
    if (isGetSets) {
      getSetData();
    }
  }, [token, userId, getSetData, isGetSets]);

  return {
    state,
    dispatch,
    addSetHandler,
    editSetHandler,
    deleteSetHandler,
    sets,
  };
};

export default useSetCollection;
