import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/context/auth/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const PublicOnlyRoute = ({
  children,
  redirectTo,
}: ProtectedRouteProps) => {
  const { isAuthenticated, userSlug } = useAuthContext();

  if (isAuthenticated) {
    // If already logged in, redirect to dashboard
    return <Navigate to={redirectTo || `/dashboard`} replace />;
  }

  return <>{children}</>;
};
