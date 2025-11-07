import { useEffect, useRef, useCallback } from "react";
import { AUTH_CONFIG } from "@/config/auth.config";

interface TokenRefreshConfig {
  token: string | null;
  userId: string | null;
  refreshAuthToken: (userId: string, token: string) => Promise<void>;
  logout: () => Promise<void>;
}

/**
 * Manages periodic token refresh for authenticated users.
 */
export const useTokenRefresh = ({
  token,
  userId,
  refreshAuthToken,
  logout,
}: TokenRefreshConfig) => {
  const refreshInterval = useRef<NodeJS.Timeout | number | null>(null);

  const refreshToken = useCallback(async () => {
    if (token && typeof userId === "string") {
      try {
        await refreshAuthToken(userId, token);
      } catch (error) {
        console.error("Failed to refresh token:", error);
        if (error instanceof Error && error.message.includes("401")) {
          logout();
        }
      }
    }
  }, [logout, refreshAuthToken, token, userId]);

  useEffect(() => {
    if (token) {
      // Set interval to refresh token periodically (every 10min )
      refreshInterval.current = setInterval(
        refreshToken,
        AUTH_CONFIG.TOKEN_REFRESH_INTERVAL,
      );

      return () => {
        // Cleanup on unmount or token change
        if (refreshInterval.current) {
          clearInterval(refreshInterval.current);
        }
      };
    }
  }, [token, refreshToken]);

  return refreshInterval;
};
