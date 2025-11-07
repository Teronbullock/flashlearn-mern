import { createContext, useContext } from "react";

interface AuthContextValue {
  userId?: string | null;
  isLoggedIn?: boolean;
  isAuthenticated?: boolean | null;
  token?: string | null;
  login?: (userEmail: string, userPass: string) => void;
  logout?: () => void;
  tokenExpTime?: Date | null;
  userSlug?: string | null;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextValue>({ isLoading: true });

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
