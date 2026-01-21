import { createContext, useContext } from "react";
import type { AuthContextValue } from "@feats/auth/types";

export const AuthContext = createContext<AuthContextValue>({
  userId: null,
  token: null,
  tokenExpTime: null,
  isAuthenticated: false,
  login: async () => {
    throw new Error("AuthContext used outside provider.");
  },
  logout: async () => {
    throw new Error("AuthContext used outside provider.");
  },
  isLoading: true,
});

/**
 * -- Custom hook to use the AuthContext --
 * @returns The AuthContext object
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider",
    );
  }
  return context;
};
