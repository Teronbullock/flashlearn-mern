import type {
  UserState,
  AuthReducerAction,
  RegisterState,
  LoginState,
} from "@feats/auth/types";

export const INITIAL_REGISTER_STATE: RegisterState = {
  type: "register",
  user_email: "",
  user_pass: "",
  user_pass_confirm: "",
};

export const INITIAL_LOGIN_STATE: LoginState = {
  type: "login",
  user_email: "",
  user_pass: "",
};

/**
 * Manages auth form state for login and registration
 */
export const authFormReducer = (
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
