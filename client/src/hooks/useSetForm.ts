import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import apiRequest from "@/lib/api";
import { useAuthContext } from "@/hooks/index";
import { useSetReducer } from "./useSetReducer";

interface UseSetFormProps {
  setId?: string;
  useOnLoad?: boolean;
}
export const useSetForm = ({ setId, useOnLoad = false }: UseSetFormProps) => {
  const navigate = useNavigate();
  const { userSlug, token } = useAuthContext();
  const [state, dispatch] = useSetReducer();

  const apiConfig = useMemo(
    () => ({ headers: { authorization: `Bearer ${token ?? ""}` } }),
    [token],
  );

  // getSetData
  const getSetData = useCallback(async () => {
    try {
      const res = await apiRequest({
        url: `/api/set/${userSlug}/${setId}/edit`,
        config: apiConfig,
      });
      const { title, description } = res.data.set;
      dispatch({
        type: "ON_LOAD",
        payload: { inputOneValue: title, inputTwoValue: description },
      });
    } catch (err) {
      console.error("Error fetching set:", err);
      navigate(`/${userSlug}/dashboard`);
    }
  }, [apiConfig, setId, userSlug, dispatch, navigate]);

  // addSet
  const addSet = useCallback(
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
          dispatch({ type: "SUBMIT" });
          navigate(`/${userSlug}/dashboard`);
        }
      } catch (error) {
        console.error(error);
        alert("Error creating set");
      }
    },
    [
      userSlug,
      apiConfig,
      state.inputOneValue,
      state.inputTwoValue,
      navigate,
      dispatch,
    ],
  );

  // editSet
  const editSet = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
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
        console.error("Error updating set:", error);
        alert("Error updating set");
      }
    },
    [
      userSlug,
      setId,
      apiConfig,
      state.inputOneValue,
      state.inputTwoValue,
      navigate,
    ],
  );

  // deleteSet
  const deleteSet = useCallback(
    async (setId: number) => {
      try {
        const res = await apiRequest({
          method: "delete",
          url: `/api/set/user/${userSlug}/${setId}/delete`,
          config: apiConfig,
        });
        alert(res.data.msg);
        getSetData();
      } catch (err) {
        console.error("Error deleting set:", err);
      }
    },
    [userSlug, apiConfig, getSetData],
  );

  useEffect(() => {
    if (!useOnLoad) return;

    getSetData();
  }, [getSetData, useOnLoad]);

  return { state, dispatch, addSet, editSet, deleteSet };
};
