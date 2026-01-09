import { useReducer } from "react";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { Credentials, LoginAction } from "@feats/auth/types";

const initialLoginState = {
  user_email: "",
  user_pass: "",
};

const loginFormReducer = (state: Credentials, action: LoginAction) => {
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
