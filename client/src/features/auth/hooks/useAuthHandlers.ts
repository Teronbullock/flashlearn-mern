import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@feats/auth/service/auth-service";
import { authStorage } from "@feats/auth/service/auth-storage";
import { AUTH_CONFIG } from "@/config/auth.config";
import { AuthReducerAction, AuthStateBase } from "@feats/auth/types";

export const useAuthHandlers = (
  dispatch: React.Dispatch<AuthReducerAction>,
) => {
  const refreshInProgressRef = useRef(false);
  const navigate = useNavigate();

  const setAuthUser = useCallback(
    (authData: AuthStateBase) => {
      const { userId, userSlug, token, tokenExpTime } = authData;

      if (!userSlug || !token || !userId || !tokenExpTime) {
        throw new Error("Auth data is required");
      }

      dispatch({
        type: "LOGIN",
        payload: { userId, userSlug, token, tokenExpTime },
      });

      authStorage.set({ userId, userSlug, token, tokenExpTime });
    },
    [dispatch],
  );

  const login = useCallback(
    async (userEmail: string, userPass: string) => {
      if (!userEmail || !userPass) {
        throw new Error("Email and password are required");
      }

      const authData = await authApi.login(userEmail, userPass);
      setAuthUser(authData);
      navigate(AUTH_CONFIG.ROUTES.DASHBOARD);
    },
    [navigate, setAuthUser],
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      dispatch({ type: "LOGOUT" });
      authStorage.remove();
      navigate(AUTH_CONFIG.ROUTES.HOME);
    }
  }, [navigate, dispatch]);

  const refreshAuthToken = useCallback(
    async (currentUserId: string, currentToken: string) => {
      if (refreshInProgressRef.current) {
        return;
      }

      refreshInProgressRef.current = true;

      try {
        const authData = await authApi.refreshToken(
          currentUserId,
          currentToken,
        );
        setAuthUser(authData);
      } catch (err) {
        console.error("Token refresh failed:", err);
        await logout();
      } finally {
        refreshInProgressRef.current = false;
      }
    },
    [setAuthUser, logout],
  );

  return { login, logout, refreshAuthToken, setAuthUser };
};
