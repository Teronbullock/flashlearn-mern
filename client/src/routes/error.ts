import { lazy } from "react";
import { RouteConfig } from "./config";

export const ERROR_ROUTES: RouteConfig[] = [
  {
    path: "/unauthorized",
    element: lazy(() => import("@/pages/PageNotFound")),
  },
  {
    path: "*",
    element: lazy(() => import("@/pages/PageNotFound")),
  },
];
