import { useCallback, useReducer, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
import {
  loginUser,
  logoutUser,
  getRefreshAuthToken,
} from "../../lib/auth-service";
import { AUTH_CONFIG } from "@/config/auth.config";
import {
  authReducer,
  authReducerInitialState,
  AuthStateBase,
} from "@context/auth/authReducer";
import {
  useTokenRefresh,
  useInitializeAuth,
  useAutoLogout,
} from "@context/auth/hooks";

interface ContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: ContextProviderProps) => {
  const navigate = useNavigate();
  const [authState, dispatch] = useReducer(
    authReducer,
    authReducerInitialState,
  );

  const { userId, token, tokenExpTime, isAuthenticated, userSlug, isLoading } =
    authState;

  // Set authenticated user data
  const setAuthUser = useCallback((authData: AuthStateBase) => {
    const { userId, userSlug, token, tokenExpTime } = authData;
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
      AUTH_CONFIG.LOCAL_STORAGE_KEY,
      JSON.stringify({
        userId,
        userSlug,
        token,
        tokenExpTime,
      }),
    );
  }, []);

  // login handler
  const login = useCallback(
    async (userEmail: string, userPass: string) => {
      try {
        const results = await loginUser(userEmail, userPass);
        const { userId, userSlug, token } = results;
        const tokenExpTime = new Date(results.tokenExpTime);

        setAuthUser({ userId, userSlug, token, tokenExpTime });
        if (token) {
          navigate(AUTH_CONFIG.ROUTES.DASHBOARD);
        }
      } catch (error) {
        console.error("Login API failed", error);
        throw error;
      }
    },
    [navigate, setAuthUser],
  );

  // logout handler
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

  // Token refresh handler
  const refreshAuthToken = useCallback(
    async (currentUserId: string, currentToken: string) => {
      try {
        const result = await getRefreshAuthToken(currentUserId, currentToken);
        const { userId, userSlug, token } = result;
        const tokenExpTime = new Date(result.tokenExpTime);

        if (token && result) {
          setAuthUser({ userId, userSlug, token, tokenExpTime });
        }
      } catch (err) {
        console.error("Token refresh failed:", err);
        await logout();
      }
    },
    [setAuthUser, logout],
  );

  // Hook to check auth status on app load
  useInitializeAuth(dispatch);

  // Hook to manage token refresh
  useTokenRefresh({ token, userId, refreshAuthToken, logout });

  // Hook to auto logout user when token expires
  useAutoLogout({ token, tokenExpTime, logout });

  const value = useMemo(
    () => ({
      userId,
      userSlug,
      token,
      tokenExpTime,
      isAuthenticated,
      isLoggedIn: !!token,
      login,
      logout,
      isLoading,
    }),
    [
      userId,
      userSlug,
      login,
      logout,
      isAuthenticated,
      token,
      tokenExpTime,
      isLoading,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
