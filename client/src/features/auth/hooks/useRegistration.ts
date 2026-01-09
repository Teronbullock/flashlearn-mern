import { useReducer } from "react";
import { apiRequest } from "@lib/api";

import type {
  RegistrationAction,
  RegistrationDetails,
} from "@feats/auth/types";

const initialRegisterState = {
  user_email: "",
  user_pass: "",
  user_pass_confirm: "",
};

const registerFormReducer = (
  state: RegistrationDetails,
  action: RegistrationAction,
) => {
  switch (action.type) {
    case "ON_CHANGE":
      return {
        ...state,
        ...action.payload,
      };
    case "FORM_RESET":
      return initialRegisterState;
    default:
      return state;
  }
};

export const useRegistration = () => {
  const [state, dispatch] = useReducer(
    registerFormReducer,
    initialRegisterState,
  );

  const {
    user_email: userEmail,
    user_pass: userPass,
    user_pass_confirm: userPassConfirm,
  } = state;

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!userEmail || !userPass || !userPassConfirm) {
        throw new Error("All fields are required");
      }

      if (userPass.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      if (userPass !== userPassConfirm) {
        throw new Error("Passwords do not match");
      }

      const res = await apiRequest({
        method: "post",
        url: "/auth/register",
        data: {
          user_email: userEmail,
          user_pass: userPass,
          user_pass_confirm: userPassConfirm,
        },
      });

      if (!res || res.status !== 200) {
        throw new Error("Registration Error");
      }

      alert("Registration successful");
      dispatch({ type: "FORM_RESET" });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error: " + errorMessage);
      alert(errorMessage);
    }
  };

  return {
    submitHandler,
    state,
    dispatch,
  };
};
