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

  return { logout };
};
