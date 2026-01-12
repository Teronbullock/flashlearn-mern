import { useEffect } from "react";
import { apiRequest } from "@/lib/api";

interface UserAction {
  type: "GET_PROFILE";
  payload: {
    user_email: string;
  };
}

export const useGetProfile = (
  dispatch: React.Dispatch<UserAction>,
  token: string | null,
) => {
  useEffect(() => {
    (async () => {
      try {
        if (!token) {
          throw new Error("Missing user identifier or authentication token");
        }

        const res = await apiRequest({
          url: `/profile`,
          token: token,
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
  }, [token, dispatch]);

  return;
};
