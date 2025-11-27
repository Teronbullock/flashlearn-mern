import { AUTH_CONFIG } from "@/config/auth.config";
import { AuthStateBase } from "@context/auth/authReducer";

export const authStorage = {
  set: (data: AuthStateBase): void => {
    try {
      localStorage.setItem(AUTH_CONFIG.LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save auth data:", error);
    }
  },

  get: (): AuthStateBase | null => {
    try {
      const data = localStorage.getItem(AUTH_CONFIG.LOCAL_STORAGE_KEY);
      if (!data) return null;

      const parsed = JSON.parse(data);
      // Reconstruct Date object
      if (parsed.tokenExpTime) {
        parsed.tokenExpTime = new Date(parsed.tokenExpTime);
      }

      return parsed;
    } catch (error) {
      console.error("Failed to retrieve auth data:", error);
      return null;
    }
  },

  remove: (): void => {
    try {
      localStorage.removeItem(AUTH_CONFIG.LOCAL_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to remove auth data:", error);
    }
  },
};
