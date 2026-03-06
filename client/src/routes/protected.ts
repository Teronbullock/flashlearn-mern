import { lazy } from "react";
import { RouteConfig } from "./config";

export const PROTECTED_ROUTES: RouteConfig[] = [
  {
    path: "/dashboard",
    element: lazy(() => import("@/features/dashboard/pages/dashboard-page")),
  },
  {
    path: "/profile",
    element: lazy(() => import("@feats/auth/pages/ProfilePage")),
  },
  {
    path: "/set/add",
    element: lazy(() => import("@/features/set/pages/add-set-page")),
  },
  {
    path: "/set/:setId",
    element: lazy(() => import("@/features/set/pages/set-page")),
  },
  {
    path: "/set/:setId/edit",
    element: lazy(() => import("@/features/set/pages/edit-set-page")),
  },
  {
    path: "/set/:setId/cards",
    element: lazy(() => import("@/features/card/pages/view-card-page")),
  },
  {
    path: "/set/:setId/card/add",
    element: lazy(() => import("@/features/card/pages/add-card-page")),
  },
  {
    path: "/set/:setId/card/:cardId/edit",
    element: lazy(() => import("@/features/card/pages/edit-card-page")),
  },
];
