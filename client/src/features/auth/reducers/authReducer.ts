import type { AuthReducerAction } from "@feats/auth/types";

import type { RegistrationDetails } from "@app-types/auth";

export const INITIAL_REGISTER_STATE = {
  type: "register",
  user_email: "",
  user_pass: "",
  user_pass_confirm: "",
};

export const INITIAL_LOGIN_STATE = {
  type: "login",
  user_email: "",
  user_pass: "",
};

/**
 * Manages auth form state for login and registration
 */
export const authFormReducer = (
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
