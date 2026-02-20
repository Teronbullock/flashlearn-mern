import { useEffect, useRef } from "react";
import { UseAutoLogoutConfig } from "@feats/auth/types";

/**
 * Manages an automatic session logout timer based on token expiration time.
 */
export const useAutoLogout = ({
  token,
  tokenExpTime,
  logout,
}: UseAutoLogoutConfig) => {
  const logoutTimer = useRef<number | NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!token || !tokenExpTime) return;

    const remainingTime = new Date(tokenExpTime).getTime() - Date.now();

    if (remainingTime > 0) {
      logoutTimer.current = setTimeout(logout, remainingTime);
    } else {
      logout();
    }

    return () => {
      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
      }
    };
  }, [token, logout, tokenExpTime]);
};
