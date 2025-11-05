import { useAuthContext } from "@/hooks/index";

export const useAuthState = () => {
  const { isAuthenticated } = useAuthContext();
  return { isAuthenticated };
};
