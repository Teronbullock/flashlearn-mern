import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@feats/auth/service/auth.service";
import { authStorage } from "@feats/auth/service/auth.storage";
import { AUTH_CONFIG } from "@/config/auth.config";
import type { AuthReducerAction } from "@feats/auth/types";
import { ZodError } from "zod";
import { AuthLoginSchema } from "@flashlearn/common";

export const useAuthHandlers = (
  dispatch: React.Dispatch<AuthReducerAction>,
) => {
  const navigate = useNavigate();

  const login = useCallback(
    async (userEmail: string, userPass: string) => {
      try {
        if (!userEmail || !userPass) {
          throw new Error("Email and password are required");
        }

        AuthLoginSchema.parse({
          userEmail,
          userPass,
        });

        console.log("login", userEmail, userPass);
        const { userId, token, tokenExpTime } = await authApi.login(
          userEmail,
          userPass,
        );
        console.log("login after api", userId, token, tokenExpTime);

        if (!userId || !token || !tokenExpTime) {
          throw new Error("Invalid auth data");
        }

        dispatch({
          type: "LOGIN",
          payload: { userId, token, tokenExpTime },
        });

        authStorage.set({ token });

        navigate(AUTH_CONFIG.ROUTES.DASHBOARD);
      } catch (error) {
        if (error instanceof ZodError) {
          const fieldErrors: Record<string, string[]> = {};
          error.issues.forEach((issue) => {
            const path = issue.path[0] as string;
            if (!fieldErrors[path]) {
              fieldErrors[path] = [];
            }
            fieldErrors[path].push(issue.message);
            console.log("fieldErrors", fieldErrors);
          });
          // setErrors(fieldErrors);
        } else {
          const msg = error instanceof Error ? error.message : "Login Error";
          alert(msg);
        }
      }
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
