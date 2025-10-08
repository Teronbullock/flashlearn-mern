import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";
import "./App.css";
import Header from "@layouts/Header";
import Footer from "@layouts/Footer";

import Index from "@pages/Index";
import DashboardPage from "@pages/dashboard";
import { SetPage, AddSetPage, EditSetPage } from "@pages/set";
import { AddCardPage, EditCardPage, ViewCardsPage } from "@pages/card";
import { LoginPage, RegisterPage } from "@pages/auth";
import ProfilePage from "@pages/profile/Profile";

import PageNotFound from "@pages/PageNotFound";

const App = () => {
  const { userSlug, token } = useAuthContext()!;
  let routes;

  if (!token) {
    routes = (
      <>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="*" element={<PageNotFound />} /> */}
        <Route path="/profile/:userSlug" element={<ProfilePage />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/dashboard/:userSlug" element={<DashboardPage />} />
        <Route path="/profile/:userSlug" element={<ProfilePage />} />
        <Route path="/set/:setId" element={<SetPage />} />
        <Route path="/set/user/:userSlug/add" element={<AddSetPage />} />
        {/* <Route path="/set/:setId/edit" element={<EditSetPage />} /> */}
        {/* <Route path="/set/:setId/card/add" element={<AddCardPage />} /> */}
        {/* <Route
          path="/set/:setId/card/:cardId/edit"
          element={<EditCardPage />}
        /> */}
        {/* <Route path="/set/:setId/cards" element={<ViewCardsPage />} /> */}
        {/* <Route path="/" element={<Navigate to={`/dashboard/${userSlug}`} />} /> */}
        {/* <Route path="*" element={<PageNotFound />} /> */}
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
