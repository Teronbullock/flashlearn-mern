import { createContext, useCallback, useEffect, useReducer, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../lib/api';
import { setUserAndToken } from '../lib/auth-utils';


interface AuthContextValue {
  userId?: string | null;
  setUserID?: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn?: boolean;
  token?: string | null;
  setToken?: React.Dispatch<React.SetStateAction<string | null>>;
  login?: (userId: string, token: string, expirationDate?: Date | null) => void ;
  logout?: () => void;
  tokenExpTime?: Date | null;
}

interface ContextProviderProps {
  children: React.ReactNode;
}

interface AuthReducerState {
  userId: string | null;
  token: string | null;
  tokenExpTime: Date | null;
  isAuthenticated: boolean;
}

type AuthReducerAction = 
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


export const AuthContext = createContext<AuthContextValue>({
  userId: null,
  isLoggedIn: false,
  setToken: () => {},
  token: null,
  login: () => {},
});

// Auth reducer
const authReducer = (state: AuthReducerState, action: AuthReducerAction) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userId: action.payload.userId,
        token: action.payload.token,
        tokenExpTime: action.payload.tokenExpTime,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        userId: null,
        token: null,
        tokenExpTime: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

/**
 * -- AuthContextProvider --
 *
 * @param children - The children of the provider
 */
export const AuthContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [authState, dispatch] = useReducer(authReducer, {
    userId: null,
    token: null,
    tokenExpTime: null,
    isAuthenticated: false,
  });
  const { userId, token, tokenExpTime, isAuthenticated } = authState;

  // Logout timer
  const logoutTimer = useRef<number | undefined>(undefined);

  // Token refresh interval
  const refreshInterval = useRef<number | null>(null);


  /**
   *  -- Login function --
   *
   * @param userName - The user name
   * @param userPass - The user password
   * @param expirationDate - The expiration date of the token
   */
  const login = useCallback(
    (
      userName: string,
      userPass: string
    ) => {
      if (!userName || !userPass) {
        throw new Error('user name and password are required');
      }
      // call the api to login the user
      (async () => {
        const res = await apiRequest({
          url: '/api/user/login',
          method: 'post',
          src: 'AuthContextProvider',
          data: {
            user_name: userName,
            user_pass: userPass,
          }
        });

        if (res.data && res.status === 200) {
          const { userId, token } = res.data;

          // set the user and token in the context
          setUserAndToken(dispatch, userId, token);

          // navigate to the dashboard
          navigate(`/dashboard/${userId}`);
        }
      })();
    },
    [dispatch, navigate]
  );


  /**
   * Logout function - Clears the userId and token in the context
   */
  const logout = useCallback(() => {

    // sets the auth reducers values to null
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('flashlearn_userData');
    navigate('/');

    // Deletes the refresh token from the backend
    (async () => {
      try {
        const res = await apiRequest({
          url: '/api/user/logout',
          method: 'post',
          src: 'AuthContextProvider'
        });
        
        if (res.status === 200) {
          console.log('User logged out successfully');
        }

      } catch (error) {
        console.error('Error logging out user from backend:', error);
      }
    })();
  
  }, [navigate]);


  /**
   * Refresh the auth token function
   */
  const refreshAuthToken = useCallback(async () => {
    try {
      const res = await apiRequest({
        url: '/api/user/refresh',
        method: 'post',
        src: 'useTokenRefresh',
        data: { userId },
        config: {
          headers: { Authorization: `Bearer ${token}` },
        }
      }, 'all');

      if (res.status === 200 && res.data) {
        const { token } = res.data;

        if (token && userId) {
          setUserAndToken(dispatch, userId, token);
        } else {
          throw new Error('Failed to refresh token, missing token or userId');
        }

      } else {
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
    }
  }, [dispatch, token, userId, logout]);


  // Set the token refresh interval
  useEffect(() => {
    if (token) {
      // Set interval to refresh token periodically (every 10min )
      refreshInterval.current = setInterval(refreshAuthToken, 1000 * 60 * 10);
      return () => {
        // Cleanup on unmount or token change
        if (refreshInterval.current) {
          clearInterval(refreshInterval.current);
        }
      };
    }
  }, [token, refreshAuthToken]);


  // Check if the user is logged in
  useEffect(() => {
    const storeDataString = localStorage.getItem('flashlearn_userData');

    // Check if the stored data is valid
    if (storeDataString) {
      try {
        const storedData = JSON.parse(storeDataString);
        const { token, userId, tokenExpTime } = storedData;
        const isExpirationValid = new Date(tokenExpTime) > new Date();

        if (token && isExpirationValid) {
          setUserAndToken?.(dispatch, userId, token);
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
    }
  }, [token, login, userId, dispatch]);


  // Set the logout timer
  useEffect(() => {
    if (token && tokenExpTime) {
      const remainingTime = tokenExpTime.getTime() - new Date().getTime();

      clearTimeout(logoutTimer.current);
      logoutTimer.current = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer.current);
    }
  }, [token, logout, login, tokenExpTime]);


  // value object for the context
  const value = {
    userId,
    login,
    logout,
    isAuthenticated,
    isLoggedIn: !!token,
    token,
    tokenExpTime,
    refreshAuthToken,
    dispatch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
