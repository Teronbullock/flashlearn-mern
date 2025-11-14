import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "@/lib/api";
import { useAuthContext } from "@/hooks/index";

interface UserAction {
  type: "GET_PROFILE";
  payload: {
    user_email: string;
  };
}

const useGetProfile = (dispatch: React.Dispatch<UserAction>) => {
  const { userSlug } = useParams();
  const { token } = useAuthContext()!;

  useEffect(() => {
    (async () => {
      try {
        const res = await apiRequest({
          url: `/api/user/${userSlug}/profile`,
          config: { headers: { Authorization: `Bearer ${token}` } },
        });

        const { user_email } = res.data;
        dispatch({ type: "GET_PROFILE", payload: { user_email } });
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }
      }
    })();
  }, [userSlug, dispatch, token]);

  return;
};

export default useGetProfile;
