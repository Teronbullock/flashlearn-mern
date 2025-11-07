import { AUTH_CONFIG } from "@/config/auth.config";
import { useEffect, useCallback, Dispatch } from "react";
import { AuthReducerAction } from "@context/auth/authReducer";

/**
 * Checks authentication status on mount by validating stored token data
 * from localStorage. If valid, updates the auth state via the provided callback.
 *
 * @param setAuthUser - Callback function to update authentication state
 * with user details and token expiration
 */
export const useInitializeAuth = (
  dispatch: Dispatch<AuthReducerAction>,
): void => {
  const checkAndUpdateAuth = useCallback(() => {
    // Get user data
    const storeDataString = localStorage.getItem(AUTH_CONFIG.LOCAL_STORAGE_KEY);

    if (!storeDataString) {
      dispatch({ type: "AUTH_INITIALIZED" });
      return;
    }

    try {
      const userData = JSON.parse(storeDataString);
      const { token, userId, userSlug } = userData;
      const tokenExpTime = new Date(userData.tokenExpTime);

      if (!token || !userId || !userSlug || !tokenExpTime) {
        localStorage.removeItem(AUTH_CONFIG.LOCAL_STORAGE_KEY);
        dispatch({ type: "AUTH_INITIALIZED" });
        return;
      }

      const isExpirationValid = tokenExpTime > new Date();

      if (isExpirationValid) {
        dispatch({
          type: "LOGIN",
          payload: {
            userId,
            userSlug,
            token,
            tokenExpTime,
          },
        });
      } else {
        localStorage.removeItem(AUTH_CONFIG.LOCAL_STORAGE_KEY);
        dispatch({ type: "AUTH_INITIALIZED" });
      }
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      localStorage.removeItem(AUTH_CONFIG.LOCAL_STORAGE_KEY);
      dispatch({ type: "AUTH_INITIALIZED" });
    }
  }, [dispatch]);

  useEffect(() => {
    checkAndUpdateAuth();
  }, [checkAndUpdateAuth]);
};
