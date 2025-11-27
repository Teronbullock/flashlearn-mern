import type { AuthReducerAction, RegisterState } from "@feats/auth/types";

export const initialRegisterState: RegisterState = {
  user_email: "",
  user_pass: "",
  user_pass_confirm: "",
};

/**
 * Manages auth form state for login and registration
 */
export const registerFormReducer = (
  state: RegisterState,
  action: AuthReducerAction,
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
