import { useReducer, useCallback } from "react";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { postNewUser } from "@feats/auth/service/auth-service-fix";
import {
  INITIAL_LOGIN_STATE,
  INITIAL_REGISTER_STATE,
  authFormReducer,
} from "@feats/auth/reducers/authReducer";

export const useAuthPage = () => {
  const { login } = useAuthContext();
  const [state, dispatch] = useReducer(authFormReducer, INITIAL_REGISTER_STATE);

  const handleRegFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (state.type !== "register") {
      console.error(
        "Attempted registration submission from non-register state.",
      );
      return;
    }

    try {
      if (state.user_pass.length < 8 || state.user_pass_confirm.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      if (state.user_pass !== state.user_pass_confirm) {
        throw new Error("Passwords do not match");
      }

      const res = await postNewUser({
        userEmail: state.user_email,
        userPass: state.user_pass,
        userPassConfirm: state.user_pass_confirm,
      });

      if (!login || res.status !== 200) {
        throw new Error("Registration Error");
      }

      alert("Registration successful");
      login(state.user_email, state.user_pass);
      dispatch({ type: "REG_SUBMIT" });

      // apiRequest({
      //   method: "post",
      //   url: "/user/register",
      //   data: {
      //     user_email: state.user_email,
      //     user_pass: state.user_pass,
      //     user_pass_confirm: state.user_pass_confirm,
      //   },
      // });

      // if (res.status === 200 && login) {
      // } else {
      //   throw new Error("Registration Error");
      // }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error: " + errorMessage);
      alert(errorMessage);
    }
  };

  const handleLoginFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (login) {
      login(state.user_email, state.user_pass);
      dispatch({ type: "LOGIN_SUBMIT" });
    } else {
      throw new Error("Login function not found");
    }
  };

  const setAuthType = useCallback(
    (type: "login" | "register") => {
      dispatch({
        type: "SET_STATE_TYPE",
        payload: type,
      });
    },
    [dispatch],
  );

  return {
    handleRegFormSubmit,
    handleLoginFormSubmit,
    state,
    dispatch,
    setAuthType,
  };
};
