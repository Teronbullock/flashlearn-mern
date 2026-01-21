import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@feats/auth/service/auth.service";
import { authStorage } from "@feats/auth/service/auth.storage";
import { AUTH_CONFIG } from "@/config/auth.config";
import type { AuthReducerAction } from "@feats/auth/types";

export const useAuthHandlers = (
  dispatch: React.Dispatch<AuthReducerAction>,
) => {
  const navigate = useNavigate();

  const login = useCallback(
    async (userEmail: string, userPass: string) => {
      if (!userEmail || !userPass) {
        throw new Error("Email and password are required");
      }

      const { userId, token, tokenExpTime } = await authApi.login(
        userEmail,
        userPass,
      );

      if (!userId || !token || !tokenExpTime) {
        throw new Error("Invalid auth data");
      }

      dispatch({
        type: "LOGIN",
        payload: { userId, token, tokenExpTime },
      });

      authStorage.set({ token });

      navigate(AUTH_CONFIG.ROUTES.DASHBOARD);
    },
    [navigate, dispatch],
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

  return { login, logout };
};
