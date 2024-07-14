export interface AuthContextValue {
  userId?: string | null;
  setUserID?: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn?: boolean;
  token?: string | null;
  setToken?: React.Dispatch<React.SetStateAction<string | null>>;
  login?: (userId: string, token: string, expirationDate?: Date | null) => void ;
  logout?: () => void;
  tokenExpiration?: Date | null;
}

export interface ContextProviderProps {
  children: React.ReactNode;
}

