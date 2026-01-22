import { useReducer, useState } from "react";
import { ZodError } from "zod";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import type { BaseAuthFields } from "@/types/index";
import type { LoginAction } from "../types/index";
import { AuthLoginSchema } from "@flashlearn/common";

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
  const { login } = useAuthContext();
  const [state, dispatch] = useReducer(loginFormReducer, initialLoginState);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { user_email: userEmail, user_pass: userPass } = state;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    try {
      if (!userEmail || !userPass) {
        throw new Error("All fields are required");
      }

      login(userEmail, userPass);

      dispatch({ type: "FORM_RESET" });
      console.log("after ran", userEmail, userPass);
    } catch (error) {
      // if (error instanceof ZodError) {
      //   const fieldErrors: Record<string, string[]> = {};
      //   error.issues.forEach((issue) => {
      //     const path = issue.path[0] as string;
      //     if (!fieldErrors[path]) {
      //       fieldErrors[path] = [];
      //     }
      //     fieldErrors[path].push(issue.message);
      //   });
      //   setErrors(fieldErrors);
      // } else {
      //   const msg = error instanceof Error ? error.message : "Login Error";
      //   alert(msg);
      // }
      setErrors(error as Record<string, string[]>);
      console.log("error", error);
    }
  };

  return { submitHandler, dispatch, state, errors };
};
