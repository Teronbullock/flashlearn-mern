import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";
import "./App.css";
import Header from "@layouts/Header";
import Footer from "@layouts/Footer";

import { Index } from "@pages/index";
import DashboardPage from "@pages/dashboard";
import { SetPage, AddSetPage, EditSetPage } from "@pages/set";
import { AddCardPage, EditCardPage, ViewCardsPage } from "@pages/card";
import { LoginPage, RegisterPage } from "@pages/auth";
import { ProfilePage } from "@pages/profile";

import { PageNotFound } from "@pages/PageNotFound";

const App = () => {
  const { userSlug, token } = useAuthContext()!;
  let routes;

  if (!token) {
    routes = (
      <>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile/:userSlug" element={<ProfilePage />} />
        <Route path="/unauthorized" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/:userSlug/dashboard" element={<DashboardPage />} />
        <Route path="/profile/:userSlug" element={<ProfilePage />} />
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
        <Route path="/unauthorized" element={<PageNotFound />} />
        <Route path="/" element={<Navigate to={`/${userSlug}/dashboard`} />} />
        <Route path="*" element={<PageNotFound />} />
      </>
    );
  }

  return (
    <>
      <Header />
      <Routes>{routes}</Routes>
      <Footer />
    </>
  );
};

export default App;
