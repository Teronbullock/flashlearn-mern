import { Route, Routes } from "react-router-dom";
import { HomePage } from "@pages/Home";
import { DashboardPage } from "@pages/Dashboard";
import { SetPage, AddSetPage, EditSetPage } from "@pages/Set";
import { AddCardPage, EditCardPage, ViewCardsPage } from "@pages/Card";
import { LoginPage, RegisterPage } from "@pages/Auth";
import { ProfilePage } from "@pages/Profile";

import { PageNotFound } from "@pages/PageNotFound";
import { ProtectedOutlet } from "@components/ProtectedOutlet";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
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
        {/* <Route
          path="/:userSlug/set/:setId/cards/:page"
          element={<ViewCardsPage />}
        /> */}
        <Route path="/set/:setId/cards" element={<ViewCardsPage />} />
        <Route path="/profile/" element={<ProfilePage />} />
      </Route>
      {/* Errors */}
      <Route path="/unauthorized" element={<PageNotFound />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
