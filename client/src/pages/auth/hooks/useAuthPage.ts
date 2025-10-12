import { useReducer, useCallback } from "react";
import { useAuthContext } from "@hooks/useAuthContext";
import {
  AuthReducerAction,
  RegisterState,
  LoginState,
  UserState,
} from "@pages/auth";

import apiRequest from "@/lib/api";

const INITIAL_REGISTER_STATE: RegisterState = {
  type: "register",
  user_email: "",
  user_pass: "",
  user_pass_confirm: "",
};

const INITIAL_LOGIN_STATE: LoginState = {
  type: "login",
  user_email: "",
  user_pass: "",
};

const authReducer = (
  state: UserState,
  action: AuthReducerAction,
): UserState => {
  switch (action.type) {
    case "ON_CHANGE":
      return {
        ...state,
        ...action.payload,
      };
    case "REG_SUBMIT":
      return INITIAL_REGISTER_STATE;
    case "LOGIN_SUBMIT":
      return INITIAL_LOGIN_STATE;
    case "SET_STATE_TYPE":
      return action.payload === "login"
        ? INITIAL_LOGIN_STATE
        : INITIAL_REGISTER_STATE;
    default:
      return state;
  }
};

export const useAuthPage = () => {
  const { login } = useAuthContext();
  const [state, dispatch] = useReducer(authReducer, INITIAL_REGISTER_STATE);

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

      const res = await apiRequest({
        method: "post",
        url: "/api/user/register",
        data: {
          user_email: state.user_email,
          user_pass: state.user_pass,
          user_pass_confirm: state.user_pass_confirm,
        },
      });

      if (res.status === 200 && login) {
        alert("Registration successful");
        login(state.user_email, state.user_pass);
        dispatch({ type: "REG_SUBMIT" });
      } else {
        throw new Error("Registration Error");
      }
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
