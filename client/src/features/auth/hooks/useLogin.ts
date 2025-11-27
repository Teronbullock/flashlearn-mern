import { useReducer } from "react";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { loginFormReducer, initialLoginState } from "@feats/auth/reducers";

export const useLogin = () => {
  const { login } = useAuthContext();
  const [state, dispatch] = useReducer(loginFormReducer, initialLoginState);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(state.user_email, state.user_pass);
    dispatch({ type: "FORM_RESET" });
  };

  return { submitHandler, dispatch, state };
};
