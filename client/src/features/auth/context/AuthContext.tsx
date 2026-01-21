import { createContext, useContext } from "react";

interface AuthContextValue {
  userId: string | null;
  token: string | null;
  tokenExpTime: Date | null;
  isAuthenticated: boolean | null;
  isLoggedIn: boolean;
  login: (userEmail: string, userPass: string) => void;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextValue>({
  userId: null,
  token: null,
  tokenExpTime: null,
  isAuthenticated: false,
  isLoggedIn: false,
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
