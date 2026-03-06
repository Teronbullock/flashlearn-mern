import { Route, Routes, useLocation } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { PUBLIC_ROUTES, PROTECTED_ROUTES, ERROR_ROUTES } from "./config";

import { ProtectedOutlet } from "@/routes/ProtectedOutlet";
import { RouteAuthCheck } from "@/routes/RouteAuthCheck";

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
          {PUBLIC_ROUTES.map(({ path, element: Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
        </Route>
        {/* Protected  */}
        <Route element={<ProtectedOutlet />}>
          {PROTECTED_ROUTES.map(({ path, element: Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
        </Route>
        {/* Errors */}
        {ERROR_ROUTES.map(({ path, element: Element }) => (
          <Route key={path} path={path} element={<Element />} />
        ))}
      </Routes>
    </Suspense>
  );
};
