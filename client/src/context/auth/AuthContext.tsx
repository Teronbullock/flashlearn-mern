import { createContext, useContext } from "react";

interface AuthContextValue {
  userId?: string | null;
  userSlug?: string | null;
  token?: string | null;
  tokenExpTime?: Date | null;
  isAuthenticated?: boolean | null;
  isLoggedIn?: boolean;
  login?: (userEmail: string, userPass: string) => void;
  logout?: () => void;
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
