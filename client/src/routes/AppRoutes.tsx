import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

// main pages
const HomePage = lazy(() => import("@pages/Home/HomePage"));
const ProfilePage = lazy(() => import("@feats/profile/pages/ProfilePage"));
const DashboardPage = lazy(
  () => import("@feats/dashboard/pages/DashboardPage"),
);
const PageNotFound = lazy(() => import("@pages/PageNotFound"));

// auth pages
const LoginPage = lazy(() => import("@feats/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@feats/auth/pages/RegisterPage"));

// set pages
const AddSetPage = lazy(() => import("@feats/sets/pages/AddSetPage"));
const EditSetPage = lazy(() => import("@feats/sets/pages/EditSetPage"));
const SetPage = lazy(() => import("@feats/sets/pages/SetPage"));

// card pages
const AddCardPage = lazy(() => import("@feats/cards/pages/AddCardPage"));
const EditCardPage = lazy(() => import("@feats/cards/pages/EditCardPage"));
const ViewCardsPage = lazy(() => import("@feats/cards/pages/ViewCardsPage"));

import { ProtectedOutlet } from "@components/ProtectedOutlet";
import { RouteAuthCheck } from "@components/check-auth-outlet";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScrollToTop />
      <Routes>
        {/* Public */}
        <Route element={<RouteAuthCheck />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        {/* Protected  */}
        <Route element={<ProtectedOutlet />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/set/add" element={<AddSetPage />} />
          <Route path="/set/:setId" element={<SetPage />} />
          <Route path="/set/:setId/edit" element={<EditSetPage />} />
          <Route path="/set/:setId/card/add" element={<AddCardPage />} />
          <Route
            path="/set/:setId/card/:cardId/edit"
            element={<EditCardPage />}
          />
          <Route path="/set/:setId/cards" element={<ViewCardsPage />} />
          <Route path="/profile/" element={<ProfilePage />} />
        </Route>
        {/* Errors */}
        <Route path="/unauthorized" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};
