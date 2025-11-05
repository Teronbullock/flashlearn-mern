import { useEffect, useRef } from "react";

interface AutoLogoutTimerConfig {
  token: string | null;
  tokenExpTime: Date | string | null;
  logout: () => Promise<void>;
}

/**
 * Manages an automatic session logout timer based on token expiration time.
 */
export const useAutoLogoutTimer = ({
  token,
  tokenExpTime,
  logout,
}: AutoLogoutTimerConfig) => {
  const logoutTimer = useRef<number | NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (token && tokenExpTime) {
      const expirationTime = new Date(tokenExpTime).getTime();
      const currentTime = new Date().getTime();
      const remainingTime = expirationTime - currentTime;

      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
      }

      if (remainingTime > 0) {
        logoutTimer.current = setTimeout(logout, remainingTime);
      } else {
        logout();
      }
    } else {
      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
      }
    }

    return () => {
      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
      }
    };
  }, [token, logout, tokenExpTime]);
};
