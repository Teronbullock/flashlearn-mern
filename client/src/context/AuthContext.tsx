import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../lib/api';
import { setUserAndToken } from '../lib/auth-utils';
import useTokenRefresh from './hooks/useTokenRefresh';
import {
  AuthContextValue,
  ContextProviderProps,
  AuthReducerAction,
  AuthReducerState,
} from '../types/context-types';

// Logout timer
let logoutTimer: number | undefined;

export const AuthContext = createContext<AuthContextValue>({
  userId: null,
  isLoggedIn: false,
  setToken: () => {},
  token: null,
  login: () => {},
});

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
      // expirationDate?: Date | null
    ) => {
      if (!userName || !userPass) {
        throw new Error('user name and password are required');
      }

      // call the api to login the user
      (async () => {
        const res = await apiRequest({
          url: '/api/users/login',
          method: 'post',
          src: 'AuthContextProvider',
          data: {
            user_name: userName,
            user_pass: userPass,
          },
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
    ( async ()=> {
      try {
        const res = await apiRequest({
          url: '/api/users/logout',
          method: 'post',
          src: 'AuthContextProvider',
        });
        
        if (res.status === 200) {
          dispatch({ type: 'LOGOUT' });
          localStorage.removeItem('flashlearn_userData');
          console.log('User logged out successfully');
          navigate('/');
        }
        
      } catch (error) {
        console.error('Error logging out user from backend:', error);
        alert('Error logging out user');
      }

    })();
  }, [navigate]);

  // Token refresh
  const { refreshAuthToken } = useTokenRefresh(dispatch, token, userId, logout);


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

      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
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
