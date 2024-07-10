import { createContext, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextValue, ContextProviderProps } from "../types/context-types";


export const AuthContext = createContext<AuthContextValue>({
  userId: null,
  isLoggedIn: false,
  setToken: () => {},
  token: null,
  login: () => {},
});


// Logout timer
let logoutTimer: number | undefined;

export const AuthContextProvider: React.FC<ContextProviderProps> = ({ children } ) => {
  const [userId, setUserID] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tokenExpiration, setTokenExpiration] = useState<Date | null>(null);
  const navigate = useNavigate();

  /**
   * Login function - Updates the userId and token in the context
   * when a user logs in.
   * @param userId - User ID of the user that logs in
   * @param token - Token generated when a user logs in
   * @param expirationDate - Date when the token expires
   */
  const login = useCallback((
    userId: string,
    token: string,
    expirationDate?: Date | null
  ) => {
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpiration(tokenExpirationDate);
    setToken(token);
    setUserID(userId);
    
    localStorage.setItem('flashlearn_userData', JSON.stringify({
      userId,
      token,
      expiration: tokenExpirationDate.toISOString()
    }));
    
  },[]);

  /**
   * Logout function - Clears the userId and token in the context
   */
  const logout = useCallback(() => {
    setUserID(null);
    setToken(null);
    localStorage.removeItem('flashlearn_userData');
    setTokenExpiration(null);
    navigate('/');
  }, [navigate]);

  const value = {
    userId,
    isLoggedIn: !!token,
    token,
    login,
    logout,
    tokenExpiration,
  };

  useEffect(() => {
    const storeDataString = localStorage.getItem('flashlearn_userData');

    // Check if the stored data is valid
    if (storeDataString ) {
      try {
        const storedData = JSON.parse(storeDataString);
        const { token, userId, expiration } = storedData;
        const isExpirationValid = new Date(expiration) > new Date();
  
        if (token && isExpirationValid) {
          login?.(userId, token, new Date(expiration));
        }
        
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
    }
  }, [token, login, userId]);

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }

  }, [token, logout, login, tokenExpiration]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}