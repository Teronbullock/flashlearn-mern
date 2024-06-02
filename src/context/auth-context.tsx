import { createContext, useState } from "react";

interface AuthContextValue {
  userID?: string | null;
  setUserID?: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn?: boolean;
  setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
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
  setIsLoggedIn: () => {},
  setToken: () => {},
  token: null,
  login: () => {},
});

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children } ) => {
  const [userID, setUserID] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  console.log('context: ', userID, isLoggedIn, token);
  return (
    <AuthContext.Provider
      value={{
        userID,
        setUserID,
        isLoggedIn,
        setIsLoggedIn,
        token,
        setToken,
        login: (userID: string | null, token: string | null) => {
          setUserID(userID);
          setToken(token);
        },
        // logout: loginout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}