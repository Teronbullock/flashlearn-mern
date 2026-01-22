import { useReducer, useState } from "react";
import { useNavigate } from "react-router";
import { ZodError } from "zod";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import type { BaseAuthFields } from "@/types/index";
import type { LoginAction } from "../types/index";
import { AuthLoginSchema } from "@common";
import { authApi } from "@feats/auth/service/auth.service";
import { AUTH_CONFIG } from "@/config/auth.config";
import { authStorage } from "@feats/auth/service/auth.storage";

const initialLoginState = {
  user_email: "",
  user_pass: "",
};

const loginFormReducer = (state: BaseAuthFields, action: LoginAction) => {
  switch (action.type) {
    case "ON_CHANGE":
      return {
        ...state,
        ...action.payload,
      };
    case "FORM_RESET":
      return initialLoginState;
    default:
      return state;
  }
};

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const [state, dispatchForm] = useReducer(loginFormReducer, initialLoginState);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    try {
      if (!state.user_email || !state.user_pass) {
        throw new Error("Email and password are required");
      }

      AuthLoginSchema.parse({
        userEmail: state.user_email,
        userPass: state.user_pass,
      });
      const { userId, token, tokenExpTime } = await authApi.login(
        state.user_email,
        state.user_pass,
      );

      if (!userId || !token || !tokenExpTime) {
        throw new Error("Invalid auth data");
      }

      dispatch({ type: "LOGIN", payload: { userId, token, tokenExpTime } });

      authStorage.set({ token });
      navigate(AUTH_CONFIG.ROUTES.DASHBOARD);
      dispatchForm({ type: "FORM_RESET" });
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string[]> = {};

        error.issues.forEach((issue) => {
          const path = issue.path[0] as string;

          if (!fieldErrors[path]) {
            fieldErrors[path] = [];
          }

          fieldErrors[path].push(issue.message);
        });
        setErrors(fieldErrors);
        console.log("errors", fieldErrors);
      } else {
        const errorMsg = error instanceof Error ? error.message : "Login Error";
        console.error(error);
        setErrors({ general: [errorMsg] });
      }
    }
  };

  return { submitHandler, dispatch: dispatchForm, state, errors };
};
