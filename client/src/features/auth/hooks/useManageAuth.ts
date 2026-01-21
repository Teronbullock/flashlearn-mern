import { useEffect, useRef, useCallback } from "react";
import { AUTH_CONFIG } from "@/config/auth.config";
import { authApi } from "@feats/auth/service/auth.service";
import { authStorage } from "@feats/auth/service/auth.storage";
import { ManageAuthProps } from "@feats/auth/types/index";

/**
 * Manages periodic token refresh for authenticated users.
 */
export const useManageAuth = ({ token, logout, dispatch }: ManageAuthProps) => {
  const refreshInterval = useRef<NodeJS.Timeout | number | null>(null);
  const refreshInProgressRef = useRef(false);

  const checkAndUpdateAuth = useCallback(async () => {
    const storeDataString = localStorage.getItem(AUTH_CONFIG.LOCAL_STORAGE_KEY);

    if (!storeDataString) {
      dispatch({ type: "AUTH_INITIALIZED" });
      return;
    }

    try {
      const token = storeDataString;

      if (!token) {
        throw new Error("Invalid auth data in storage");
      }

      const { userId, exp } = JSON.parse(atob(token.split(".")[1]));
      const tokenExpTime = new Date(exp * 1000);
      const isExpirationValid = tokenExpTime > new Date();

      if (!isExpirationValid) {
        try {
          const authData = await authApi.refreshToken(token);

          if (!authData || !authData.token) {
            throw new Error("Invalid auth data");
          }

          dispatch({
            type: "LOGIN",
            payload: {
              token: authData.token,
              userId: authData.userId,
              tokenExpTime: authData.tokenExpTime,
            },
          });

          authStorage.set({ token: authData.token });
          return;
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          localStorage.removeItem(AUTH_CONFIG.LOCAL_STORAGE_KEY);
        }

        dispatch({ type: "AUTH_INITIALIZED" });
        return;
      }

      dispatch({
        type: "LOGIN",
        payload: {
          token,
          userId,
          tokenExpTime,
        },
      });
    } catch (error) {
      console.error("Error parsing stored:", error);
      localStorage.removeItem(AUTH_CONFIG.LOCAL_STORAGE_KEY);
      dispatch({ type: "AUTH_INITIALIZED" });
    }
  }, [dispatch]);

  const refreshToken = useCallback(async () => {
    if (!token) {
      console.error("Missing Auth data");
      return;
    }

    if (refreshInProgressRef.current) {
      return;
    }
    refreshInProgressRef.current = true;

    try {
      const authData = await authApi.refreshToken(token);

      if (!authData) {
        throw new Error("Invalid auth data");
      }

      dispatch({
        type: "LOGIN",
        payload: {
          userId: authData.userId,
          token: authData.token,
          tokenExpTime: authData.tokenExpTime,
        },
      });

      authStorage.set({ token });
    } catch (error) {
      console.error("Failed to refresh token:", error);
      if (error instanceof Error && error.message.includes("401")) {
        logout();
      }
    } finally {
      refreshInProgressRef.current = false;
    }
  }, [logout, token, dispatch]);

  useEffect(() => {
    checkAndUpdateAuth();
  }, [checkAndUpdateAuth]);

  useEffect(() => {
    if (token) {
      // Set interval to refresh token periodically (every 10min )
      refreshInterval.current = setInterval(
        refreshToken,
        AUTH_CONFIG.TOKEN_REFRESH_INTERVAL,
      );

      return () => {
        // Cleanup on unmount or token change
        if (refreshInterval.current) {
          clearInterval(refreshInterval.current);
        }
      };
    }
  }, [token, refreshToken]);

  return refreshInterval;
};
