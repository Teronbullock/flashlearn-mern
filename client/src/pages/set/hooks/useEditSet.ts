import { useEffect } from "react";
import apiRequest from "@/lib/api";
import { useAuthContext } from "@hooks/useAuthContext";
import { useNavigate } from "react-router";

interface UseEditSetProps {
  isEditSet?: boolean;
  setId?: string;
  dispatch: React.Dispatch<any>;
}

export const useEditSet = ({
  isEditSet = false,
  setId,
  dispatch,
}: UseEditSetProps) => {
  const { userSlug, token } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEditSet || !setId) return;

    const fetchSet = async () => {
      try {
        const res = await apiRequest({
          url: `/api/set/${userSlug}/${setId}/edit`,
          config: { headers: { authorization: `Bearer ${token}` } },
        });

        const { title, description } = res.data.set;
        dispatch({
          type: "ON_LOAD",
          payload: { inputOneValue: title, inputTwoValue: description },
        });
      } catch (err) {
        console.error("Error: retrieving set", err);
        alert("Error: retrieving set");
        navigate(`/${userSlug}/dashboard`);
      }
    };

    fetchSet();
  }, [isEditSet, setId, userSlug, token, dispatch, navigate]);
};
