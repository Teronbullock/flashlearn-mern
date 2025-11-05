import { createContext, useContext } from "react";

interface AuthContextValue {
  userId?: string | null;
  isLoggedIn?: boolean;
  isAuthenticated?: boolean;
  token?: string | null;
  login?: (userEmail: string, userPass: string) => void;
  logout?: () => void;
  tokenExpTime?: Date | null;
  userSlug?: string | null;
}

export const AuthContext = createContext<AuthContextValue>({});

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
