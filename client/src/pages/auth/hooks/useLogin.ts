import { useAuthContext } from "@/hooks/index";
import { useReducer } from "react";

export interface UserState {
  user_email: string;
  user_pass: string;
}

export interface LoginReducerAction {
  type: "SUBMIT" | "ON_CHANGE";
  payload: {
    user_email?: string;
    user_pass?: string;
  };
}

// Reducer function for the Login component
const loginReducer = (state: UserState, action: LoginReducerAction) => {
  switch (action.type) {
    case "ON_CHANGE":
      return {
        ...state,
        ...action.payload,
      };
    case "SUBMIT":
      return {
        user_email: "",
        user_pass: "",
      };
    default:
      return state;
  }
};

export const useLogin = () => {
  const { login } = useAuthContext();
  const [state, dispatch] = useReducer(loginReducer, {
    user_email: "",
    user_pass: "",
  });

  return { handleFormSubmit, loginReducer, dispatch, state };
};
