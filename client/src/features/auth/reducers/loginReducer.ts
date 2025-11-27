import type { AuthReducerAction, BaseAuthState } from "@feats/auth/types";

export const initialLoginState: BaseAuthState = {
  user_email: "",
  user_pass: "",
};

/**
 * Manages auth form state for login and registration
 */
export const loginFormReducer = (
  state: BaseAuthState,
  action: AuthReducerAction,
) => {
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
