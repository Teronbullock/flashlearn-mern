import { createContext, useState } from "react";

interface AuthContextValue {
  userID?: string | null;
  setUserID?: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn?: boolean;
  // setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
  token?: string | null;
  setToken?: React.Dispatch<React.SetStateAction<string | null>>;
  login?: (arg1: string, arg2: string) => void ;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextValue>({
  userID: null,
  setUserID: () => {},
  isLoggedIn: false,
  // setIsLoggedIn: () => {},
  setToken: () => {},
  token: null,
  login: () => {},
});

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children } ) => {
  const [userID, setUserID] = useState<string | null>(null);
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  

  /**
   * Login function - Updates the userID and token in the context
   * when a user logs in.
   * @param userID 
   * @param token 
   */
  const login = (userID: string, token: string) => {
    setToken(token);
    localStorage.setItem('userData', JSON.stringify({
      userId: userID,
      token: token,
    }));
    setUserID(userID);
  }

  /**
   * Logout function - Clears the userID and token in the context
   */
  const logout = () => {
    setUserID(null);
    setToken(null);
  }

  const value = {
    userID,
    // setUserID,
    isLoggedIn: !!token,
    // setIsLoggedIn,
    token,
    // setToken,
    login: login,
    logout: logout,
  };

  console.log('context: ', userID, value.isLoggedIn, token);
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}