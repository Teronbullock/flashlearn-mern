import { AUTH_CONFIG } from "@/config/auth.config";
import { useEffect } from "react";
import { AuthStateBase } from "@context/auth/authReducer";

type UpdateAuthStateFn = (params: AuthStateBase) => void;

/**
 * Checks authentication status on mount by validating stored token data
 * from localStorage. If valid, updates the auth state via the provided callback.
 *
 * @param updateAuthState - Callback function to update authentication state
 * with user details and token expiration
 */
export const useCheckAuthStatus = (
  updateAuthState: UpdateAuthStateFn,
): void => {
  useEffect(() => {
    const checkAndUpdateAuth = () => {
      const storeDataString = localStorage.getItem(
        AUTH_CONFIG.LOCAL_STORAGE_KEY,
      );

      if (storeDataString) {
        try {
          const storedData = JSON.parse(storeDataString);
          const { token, userId, userSlug } = storedData;
          const tokenExpTime = new Date(storedData.tokenExpTime);
          const isExpirationValid = tokenExpTime > new Date();

          if (token && isExpirationValid && userId && userSlug) {
            updateAuthState({ userId, userSlug, token, tokenExpTime });
          }
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          localStorage.removeItem(AUTH_CONFIG.LOCAL_STORAGE_KEY);
        }
      }
    };

    checkAndUpdateAuth();
  }, [updateAuthState]);
};
