import { useEffect } from "react";
import { apiRequest } from "@/lib/api";
import { useAuthContext } from "@feats/auth/context/AuthContext";

interface UserAction {
  type: "GET_PROFILE";
  payload: {
    user_email: string;
  };
}

export const useGetProfile = (
  dispatch: React.Dispatch<UserAction>,
  userSlug: string | null,
) => {
  const { token } = useAuthContext()!;

  useEffect(() => {
    (async () => {
      try {
        if (userSlug && token) {
          const res = await apiRequest({
            url: `/auth/${userSlug}/profile`,
            token: token,
          });

          const { user_email } = res.data;
          dispatch({ type: "GET_PROFILE", payload: { user_email } });
        } else {
          throw new Error("Missing user identifier or authentication token");
        }
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
