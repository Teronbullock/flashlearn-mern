import { AUTH_CONFIG } from "@/config/auth.config";
import { useEffect } from "react";

export const usePersistedAuth = (
  onRestore: (data: {
    userId: string;
    userSlug: string;
    token: string;
  }) => void,
) => {
  useEffect(() => {
    const storeDataString = localStorage.getItem(AUTH_CONFIG.LOCAL_STORAGE_KEY);

    if (!storeDataString) return;

    try {
      const storedData = JSON.parse(storeDataString);
      const { token, userId, userSlug, tokenExpTime } = storedData;
      const isExpirationValid = new Date(tokenExpTime) > new Date();

      if (token && isExpirationValid) {
        onRestore({ userId, userSlug, token });
      } else {
        localStorage.removeItem(AUTH_CONFIG.LOCAL_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      localStorage.removeItem(AUTH_CONFIG.LOCAL_STORAGE_KEY);
    }
  }, []);
};
