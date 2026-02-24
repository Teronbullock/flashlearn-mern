import { lazy } from "react";
import { RouteConfig } from "./config";

export const PUBLIC_ROUTES: RouteConfig[] = [
  { path: "/", element: lazy(() => import("@/pages/home/home-page")) },
  {
    path: "/login",
    element: lazy(() => import("@/features/auth/pages/LoginPage")),
  },
  {
    path: "/register",
    element: lazy(() => import("@/features/auth/pages/RegisterPage")),
  },
];
