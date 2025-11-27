import { useReducer, useMemo } from "react";
import { AuthContext } from "@feats/auth/context/AuthContext";
import {
  authReducer,
  authReducerInitialState,
  // AuthStateBase,
} from "@feats/auth/context/authReducer";
import { useAuthHandlers } from "@feats/auth/hooks/useAuthHandlers";
import { useInitializeAuth } from "@feats/auth/hooks/useInitializeAuth";
import { useTokenRefresh } from "@feats/auth/hooks/useTokenRefresh";
import { useAutoLogout } from "@feats/auth/hooks/useAutoLogout";

interface ContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: ContextProviderProps) => {
  const [authState, dispatch] = useReducer(
    authReducer,
    authReducerInitialState,
  );

  const { userId, token, tokenExpTime, isAuthenticated, userSlug, isLoading } =
    authState;

  const { login, logout, refreshAuthToken, setAuthUser } =
    useAuthHandlers(dispatch);

  // Initialize auth state on mount
  useInitializeAuth(dispatch);

  // Manage token refresh lifecycle
  useTokenRefresh({ token, userId, refreshAuthToken, logout });

  // Auto logout on token expiration
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

//-------

// export const AuthContextProvider = ({ children }: ContextProviderProps) => {
//   const navigate = useNavigate();
//   const [authState, dispatch] = useReducer(
//     authReducer,
//     authReducerInitialState,
//   );

//   const { userId, token, tokenExpTime, isAuthenticated, userSlug, isLoading } =
//     authState;

//   // Set authenticated user data
//   const setAuthUser = useCallback((authData: AuthStateBase) => {
//     const { userId, userSlug, token, tokenExpTime } = authData;
//     if (!userSlug || !token || !userId || !tokenExpTime) {
//       throw new Error("Auth data is required");
//     }
//     dispatch({
//       type: "LOGIN",
//       payload: {
//         userId,
//         userSlug,
//         token,
//         tokenExpTime,
//       },
//     });

//     localStorage.setItem(
//       AUTH_CONFIG.LOCAL_STORAGE_KEY,
//       JSON.stringify({
//         userId,
//         userSlug,
//         token,
//         tokenExpTime,
//       }),
//     );
//   }, []);

//   // login handler
//   const login = useCallback(
//     async (userEmail: string, userPass: string) => {
//       try {
//         if (!userEmail || !userPass) {
//           throw new Error("Email and password are required");
//         }

//         const res = await apiRequest({
//           url: "/user/login",
//           method: "post",
//           data: {
//             user_email: userEmail,
//             user_pass: userPass,
//           },
//         });

//         const { userId, userSlug, token } = res.data;

//         if (!token) {
//           throw new Error("Login failed - no token received");
//         }

//         const tokenExpTime = new Date(res.data.tokenExpTime);

//         setAuthUser({ userId, userSlug, token, tokenExpTime });

//         navigate(AUTH_CONFIG.ROUTES.DASHBOARD);
//       } catch (error) {
//         console.error("Login API failed", error);
//         alert(error);
//         throw error;
//       }
//     },
//     [navigate, setAuthUser],
//   );

//   // logout handler
//   const logout = useCallback(async () => {
//     try {
//       const res = await apiRequest({
//         url: "/user/logout",
//         method: "post",
//       });

//       if (res.status === 200) {
//         console.log("User logged out successfully");
//       }
//     } catch (error) {
//       console.error("Logout API failed", error);
//     } finally {
//       dispatch({ type: "LOGOUT" });
//       localStorage.removeItem(AUTH_CONFIG.LOCAL_STORAGE_KEY);
//       navigate(AUTH_CONFIG.ROUTES.HOME);
//     }
//   }, [navigate]);

//   // Token refresh handler
//   const refreshAuthToken = useCallback(
//     async (currentUserId: string, currentToken: string) => {
//       try {
//         const result = await getRefreshAuthToken(currentUserId, currentToken);
//         const { userId, userSlug, token } = result;
//         const tokenExpTime = new Date(result.tokenExpTime);

//         if (token && result) {
//           setAuthUser({ userId, userSlug, token, tokenExpTime });
//         }
//       } catch (err) {
//         console.error("Token refresh failed:", err);
//         await logout();
//       }
//     },
//     [setAuthUser, logout],
//   );

//   // Hook to check auth status on app load
//   useInitializeAuth(dispatch);

//   // Hook to manage token refresh
//   useTokenRefresh({ token, userId, refreshAuthToken, logout });

//   // Hook to auto logout user when token expires
//   useAutoLogout({ token, tokenExpTime, logout });

//   const value = useMemo(
//     () => ({
//       userId,
//       userSlug,
//       token,
//       tokenExpTime,
//       isAuthenticated,
//       isLoggedIn: !!token,
//       login,
//       logout,
//       isLoading,
//     }),
//     [
//       userId,
//       userSlug,
//       login,
//       logout,
//       isAuthenticated,
//       token,
//       tokenExpTime,
//       isLoading,
//     ],
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
