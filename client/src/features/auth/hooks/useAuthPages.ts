import { useReducer, useCallback } from "react";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { authApi } from "@feats/auth/service/auth.service";

import type { RegistrationDetails } from "@/types/index";
import type { AuthReducerAction } from "@feats/auth/types";

const initialRegisterState = {
  type: "register",
  email: "",
  pass: "",
  pass_confirm: "",
};

const initialLoginState = {
  type: "login",
  email: "",
  user_pass: "",
};

const authFormReducer = (
  state: RegistrationDetails,
  action: AuthReducerAction,
): RegistrationDetails => {
  switch (action.type) {
    case "ON_CHANGE":
      return {
        ...state,
        ...action.payload,
      };
    case "REG_SUBMIT":
      return initialRegisterState;
    case "LOGIN_SUBMIT":
      return initialLoginState;
    case "SET_STATE_TYPE":
      return action.payload === "login"
        ? initialLoginState
        : initialRegisterState;
    default:
      return state;
  }
};

export const useAuthPages = () => {
  const { login } = useAuthContext();
  const [state, dispatch] = useReducer(authFormReducer, initialRegisterState);

  const handleRegFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (state.type !== "register") {
      console.error(
        "Attempted registration submission from non-register state.",
      );
      return;
    }

    try {
      if (state.pass.length < 8 || state.pass_confirm.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      if (state.user_pass !== state.pass_confirm) {
        throw new Error("Passwords do not match");
      }

      const res = await authApi.postNewUser({
        userEmail: state.email,
        userPass: state.pass,
        userPassConfirm: state.pass_confirm,
      });

      if (!login || res.status !== 200) {
        throw new Error("Registration Error");
      }

      alert("Registration successful");
      login(state.email, state.pass);
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
      login(state.email, state.pass);
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
