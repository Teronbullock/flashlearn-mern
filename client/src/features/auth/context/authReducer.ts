import { AuthStateBase, AuthReducerAction } from "@feats/auth/types";

export interface AuthReducerState extends AuthStateBase {
  isAuthenticated: boolean | null;
  isLoading: boolean;
}

/**
 * -- Initial state for the authReducer --
 */
export const authReducerInitialState: AuthReducerState = {
  userId: null,
  userSlug: null,
  token: null,
  tokenExpTime: null,
  isAuthenticated: false,
  isLoading: true,
};

/**
 * -- Reducer function to manage authentication state --
 *
 */
export const authReducer = (
  state: AuthReducerState,
  action: AuthReducerAction,
) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userId: action.payload.userId,
        userSlug: action.payload.userSlug,
        token: action.payload.token,
        tokenExpTime: action.payload.tokenExpTime,
        isAuthenticated: true,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        userId: null,
        token: null,
        tokenExpTime: null,
        isAuthenticated: false,
        userSlug: null,
      };
    case "AUTH_INITIALIZED":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
