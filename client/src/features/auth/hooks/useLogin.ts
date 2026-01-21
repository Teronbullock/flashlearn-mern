import { useReducer } from "react";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import type { BaseAuthFields } from "@/types/index";
import type { LoginAction } from "../types/index";

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
  const { user_email: userEmail, user_pass: userPass } = state;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userEmail || !userPass) {
      throw new Error("All fields are required");
    }

    login(userEmail, userPass);
    dispatch({ type: "FORM_RESET" });
  };

  return { submitHandler, dispatch, state };
};
