export interface AuthContextValue {
  userId?: string | null;
  setUserID?: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn?: boolean;
  token?: string | null;
  setToken?: React.Dispatch<React.SetStateAction<string | null>>;
  login?: (userId: string, token: string, expirationDate?: Date | null) => void ;
  logout?: () => void;
  tokenExpTime?: Date | null;
}

export interface ContextProviderProps {
  children: React.ReactNode;
}

export interface AuthReducerState {
  userId: string | null;
  token: string | null;
  tokenExpTime: Date | null;
  isAuthenticated: boolean;
}

export type AuthReducerAction = 
  | {
      type: 'LOGIN';
      payload: {
        userId: string;
        token: string;
        tokenExpTime: Date;
      };
    }
  | {
      type: 'LOGOUT';
    };
