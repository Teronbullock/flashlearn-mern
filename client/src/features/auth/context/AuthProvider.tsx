import { useReducer, useMemo, PropsWithChildren } from "react";
import { AuthContext } from "@feats/auth/context/AuthContext";
import type { AuthReducerAction, AuthReducerState } from "@feats/auth/types";
import {
  useManageAuth,
  useAuthHandlers,
  useAutoLogout,
} from "@feats/auth/hooks";

const authReducer = (state: AuthReducerState, action: AuthReducerAction) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userId: action.payload.userId,
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
    token: null,
    tokenExpTime: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const { userId, token, tokenExpTime, isAuthenticated, isLoading } = authState;
  const { logout } = useAuthHandlers(dispatch);

  useManageAuth({ token, logout, dispatch });
  useAutoLogout({ token, tokenExpTime, logout });

  const value = useMemo(
    () => ({
      userId,
      token,
      tokenExpTime,
      isAuthenticated,
      logout,
      isLoading,
      dispatch,
    }),
    [userId, logout, isAuthenticated, token, tokenExpTime, isLoading, dispatch],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
