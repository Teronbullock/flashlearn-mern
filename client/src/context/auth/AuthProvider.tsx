import { useCallback, useReducer, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
import {
  loginUser,
  logoutUser,
  getRefreshAuthToken,
} from "../../lib/auth-service";
import { AUTH_CONFIG } from "@/config/auth.config";
import { authReducer, AuthStateBase } from "@context/auth/authReducer";
import {
  useTokenRefresh,
  useCheckAuthStatus,
  useAutoLogoutTimer,
} from "@context/auth/hooks";

interface ContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: ContextProviderProps) => {
  const navigate = useNavigate();
  const [authState, dispatch] = useReducer(authReducer, {
    userId: null,
    userSlug: null,
    token: null,
    tokenExpTime: null,
    isAuthenticated: false,
  });

  const { userId, token, tokenExpTime, isAuthenticated, userSlug } = authState;

  // This function sets the user ID, Token info and expiration date in the context and local storage
  const updateAuthState = useCallback(
    ({ userId, userSlug, token, tokenExpTime }: AuthStateBase) => {
      if (!userSlug || !token || !userId || !tokenExpTime) {
        throw new Error("Auth data is required");
      }

      dispatch({
        type: "LOGIN",
        payload: {
          userId,
          userSlug,
          token,
          tokenExpTime,
        },
      });

      localStorage.setItem(
        "flashlearn_userData",
        JSON.stringify({
          userId,
          userSlug,
          token,
          tokenExpTime,
        }),
      );
    },
    [],
  );

  //login handler
  const login = useCallback(
    async (userEmail: string, userPass: string) => {
      try {
        const results = await loginUser(userEmail, userPass);
        const { userId, userSlug, token } = results;
        const tokenExpTime = new Date(results.tokenExpTime);

        updateAuthState({ userId, userSlug, token, tokenExpTime });
        if (token) {
          navigate(AUTH_CONFIG.ROUTES.DASHBOARD(userSlug));
        }
      } catch (error) {
        console.error("Login API failed", error);
        throw error;
      }
    },
    [navigate, updateAuthState],
  );

  // Logout handler
  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout API failed", error);
    } finally {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem(AUTH_CONFIG.LOCAL_STORAGE_KEY);
      navigate(AUTH_CONFIG.ROUTES.HOME);
    }
  }, [navigate]);

  // RefreshAuthToken
  const refreshAuthToken = useCallback(
    async (currentUserId: string, currentToken: string) => {
      const returnedToken = await getRefreshAuthToken(
        currentUserId,
        currentToken,
      );

      const { userId, userSlug, token } = returnedToken;
      const tokenExpTime = new Date(returnedToken.tokenExpTime);

      if (userSlug && returnedToken) {
        updateAuthState({ userId, userSlug, token, tokenExpTime });
      }
    },
    [updateAuthState],
  );

  useTokenRefresh({ token, userId, refreshAuthToken, logout });

  useCheckAuthStatus(updateAuthState);
  useAutoLogoutTimer({ token, tokenExpTime, logout });

  const value = useMemo(
    () => ({
      userId,
      userSlug,
      login,
      logout,
      isAuthenticated,
      isLoggedIn: !!token,
      token,
      tokenExpTime,
    }),
    [userId, userSlug, login, logout, isAuthenticated, token, tokenExpTime],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
