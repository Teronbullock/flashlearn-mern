import { Route, Routes } from "react-router-dom";
import { Index } from "@pages/index";
import DashboardPage from "@pages/dashboard";
import { SetPage, AddSetPage, EditSetPage } from "@pages/set";
import { AddCardPage, EditCardPage, ViewCardsPage } from "@pages/card";
import { LoginPage, RegisterPage } from "@pages/auth";
import { ProfilePage } from "@pages/profile";

import { PageNotFound } from "@pages/PageNotFound";
import { ProtectedOutlet } from "@components/ProtectedOutlet";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Index />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* Protected  */}
      <Route element={<ProtectedOutlet />}>
        <Route path="/:userSlug/dashboard" element={<DashboardPage />} />
        <Route path="/:userSlug/set/add" element={<AddSetPage />} />
        <Route path="/:userSlug/set/:setId" element={<SetPage />} />
        <Route path="/:userSlug/set/:setId/edit" element={<EditSetPage />} />
        <Route
          path="/:userSlug/set/:setId/card/add"
          element={<AddCardPage />}
        />
        <Route
          path="/:userSlug/set/:setId/card/:cardId/edit"
          element={<EditCardPage />}
        />
        <Route path="/:userSlug/set/:setId/cards" element={<ViewCardsPage />} />
        <Route path="/:userSlug/profile/" element={<ProfilePage />} />
      </Route>
      {/* Errors */}
      <Route path="/unauthorized" element={<PageNotFound />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
