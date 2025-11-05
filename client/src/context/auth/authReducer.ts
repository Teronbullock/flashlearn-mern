export interface AuthStateBase {
  userId: string | null;
  userSlug: string | null;
  token: string | null;
  tokenExpTime: Date | null;
}

export interface AuthReducerState extends AuthStateBase {
  isAuthenticated: boolean;
}

export type AuthReducerAction =
  | {
      type: "LOGIN";
      payload: {
        userId: string;
        token: string;
        tokenExpTime: Date;
        userSlug: string;
      };
    }
  | { type: "LOGOUT" };

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
    default:
      return state;
  }
};
