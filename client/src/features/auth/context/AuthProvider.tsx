import { useReducer, useMemo, PropsWithChildren } from "react";
import { AuthContext } from "@feats/auth/context/AuthContext";
import {
  useAuthHandlers,
  useInitializeAuth,
  useTokenRefresh,
  useAutoLogout,
} from "@feats/auth/hooks";
import type { AuthReducerAction, AuthReducerState } from "@feats/auth/types";

const authReducer = (state: AuthReducerState, action: AuthReducerAction) => {
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

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [authState, dispatch] = useReducer(authReducer, {
    userId: null,
    userSlug: null,
    token: null,
    tokenExpTime: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const { userId, token, tokenExpTime, isAuthenticated, userSlug, isLoading } =
    authState;

  const { login, logout, refreshAuthToken } = useAuthHandlers(dispatch);

  // Initialize auth state on mount
  useInitializeAuth(dispatch);

  // Manage token refresh lifecycle
  useTokenRefresh({ token, userId, refreshAuthToken, logout });

  // Auto logout on token expiration
  useAutoLogout({ token, tokenExpTime, logout });

  const value = useMemo(
    () => ({
      userId,
      userSlug,
      token,
      tokenExpTime,
      isAuthenticated,
      isLoggedIn: !!token,
      login,
      logout,
      isLoading,
    }),
    [
      userId,
      userSlug,
      login,
      logout,
      isAuthenticated,
      token,
      tokenExpTime,
      isLoading,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
