export interface AuthContextValue {
  userID?: string | null;
  setUserID?: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn?: boolean;
  token?: string | null;
  setToken?: React.Dispatch<React.SetStateAction<string | null>>;
  login?: (userID: string, token: string, expirationDate?: Date | null) => void ;
  logout?: () => void;
  tokenExpiration?: Date | null;
}

export interface AuthContextProviderProps {
  children: React.ReactNode;
}