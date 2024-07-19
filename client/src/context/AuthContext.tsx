import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextValue, ContextProviderProps } from "../types/context-types";
import apiRequest from "../lib/api";


export const AuthContext = createContext<AuthContextValue>({
  userId: null,
  isLoggedIn: false,
  setToken: () => {},
  token: null,
  login: () => {},
});


const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userId: action.payload.userId,
        token: action.payload.token,
        tokenExpiration: action.payload.expiration,
        isAuthenticated: true,
      }
    case 'LOGOUT':
      return {
        ...state,
        userId: null,
        token: null,
        tokenExpiration: null,
        isAuthenticated: false,
      }
    default:
      return state;
  }
}


// Logout timer
let logoutTimer: number | undefined;

/**
 * -- AuthContextProvider --
 * 
 * @param children - The children of the provider
 */
export const AuthContextProvider: React.FC<ContextProviderProps> = ({ children } ) => {
  const [authState, dispatch] = useReducer(authReducer, {
    userId: null,
    token: null,
    tokenExpiration: null,
    isAuthenticated: false,
  });

  const { userId, token, tokenExpiration, isAuthenticated } = authState;
  const navigate = useNavigate();

  // function name for dispatching the login action and setting the token in the local storage
  const setTokenAndLogin = useCallback((userId: number, token: string, expiration: Date) => {

    try {
      // dispatch the login action
      dispatch({ 'type': 'LOGIN', 'payload': {
        userId,
        token,
        tokenExpiration: expiration
      }});
  
      // set the token in the local storage
      localStorage.setItem('flashlearn_userData', JSON.stringify({
        userId,
        token,
        expiration: expiration.toISOString()
      }));
      return true;
    } catch (error) {
      console.error('Error setting token and login:', error);
      return false;
    }

  }, []);


  /**
   *  -- Login function --
   * 
   * @param userName - The user name
   * @param userPass - The user password
   * @param expirationDate - The expiration date of the token
   */
  const login = useCallback((userName: string, userPass: string, expirationDate?: Date | null  ) => {

    if(!userName || !userPass) {
      throw new Error('user name and password are required');
    }
    // call the api to login the user
    ( async ()=> {

      try {
        const res = await apiRequest({
          url: '/api/users/login',
          method: 'post',
          src: 'AuthContextProvider',
          data: {
            user_name: userName,
            user_pass: userPass,
          }
        });
  
  
        if (res.status === 200 && res.data) {
          console.log('login function', res.data);
          const { userId, token } = res.data;
          const expiration = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
          let isTokenAndLoginSet = false;
          isTokenAndLoginSet = setTokenAndLogin(userId, token, expiration);
          navigate(`/dashboard/${userId}`);

          return isTokenAndLoginSet;
        }
      } catch (error) {
        console.error('Error logging in:', error);
        return false;
      }
    })();
  },[]);



  /**
   * Logout function - Clears the userId and token in the context
   */
  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('flashlearn_userData');
    navigate('/');
  }, [navigate]);



  // Check if the user is logged in
  useEffect(() => {
    const storeDataString = localStorage.getItem('flashlearn_userData');

    // Check if the stored data is valid
    if (storeDataString ) {
      try {
        const storedData = JSON.parse(storeDataString);
        const { token, userId, expiration } = storedData;
        const isExpirationValid = new Date(expiration) > new Date();
  
        if (token && isExpirationValid) {
          setTokenAndLogin?.(userId, token, new Date(expiration));
        }
        
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
    }
  }, [token, login, userId, setTokenAndLogin]);


  // Set the logout timer
  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }

  }, [token, logout, login, tokenExpiration]);

  // value object for the context
  const value = {
    userId,
    login,
    logout,
    isAuthenticated,
    isLoggedIn: !!token,
    token,
    tokenExpiration
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


/**
 * -- Custom hook to use the AuthContext --
 * @returns The AuthContext object
 */ 
const useAuthContext = () => {
  const context = useContext(AuthContext);
  if(context === undefined) { 
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return context;
}

export {useAuthContext};