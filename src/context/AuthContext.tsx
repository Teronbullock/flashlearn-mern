import { createContext, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextValue, ContextProviderProps } from "./context-types";

let logoutTimer: number | undefined;

export const AuthContext = createContext<AuthContextValue>({
  userId: null,
  setUserID: () => {},
  isLoggedIn: false,
  // setIsLoggedIn: () => {},
  setToken: () => {},
  token: null,
  login: () => {},
});

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
  const login = useCallback((userId: string, token: string, expirationDate?: Date | null ) => {
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpiration(tokenExpirationDate);
    setToken(token);
    setUserID(userId);
    
    localStorage.setItem('flashlearn_userData', JSON.stringify({
      userId: userId,
      token: token,
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
    // setUserID,
    isLoggedIn: !!token,
    // setIsLoggedIn,
    token,
    // setToken,
    login: login,
    logout: logout,
    tokenExpiration: tokenExpiration
  };

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime = tokenExpiration.getTime() - new Date().getTime();

      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpiration]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}