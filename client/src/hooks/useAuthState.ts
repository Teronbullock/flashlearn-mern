import { useAuthContext } from "@feats/auth/context/AuthContext";

export const useAuthState = () => {
  const { isAuthenticated } = useAuthContext();
  return { isAuthenticated };
};
