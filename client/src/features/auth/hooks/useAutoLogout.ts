import { useEffect, useRef } from "react";

interface useAutoLogoutConfig {
  token: string | null;
  tokenExpTime: Date | string | null;
  logout: () => Promise<void>;
}

/**
 * Manages an automatic session logout timer based on token expiration time.
 */
export const useAutoLogout = ({
  token,
  tokenExpTime,
  logout,
}: useAutoLogoutConfig) => {
  const logoutTimer = useRef<number | NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!token || !tokenExpTime) {
      return () => {
        if (logoutTimer.current) {
          clearTimeout(logoutTimer.current);
        }
      };
    }
    const expirationTime = new Date(tokenExpTime).getTime();
    const currentTime = new Date().getTime();
    const remainingTime = expirationTime - currentTime;

    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }

    if (remainingTime > 0) {
      logoutTimer.current = setTimeout(logout, remainingTime);
    } else {
      console.warn("Token expiration time is in the past", remainingTime);
      // logout();
    }

    return () => {
      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
      }
    };
  }, [token, logout, tokenExpTime]);
};
