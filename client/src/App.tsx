import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "@hooks/useAuthContext";
import "./App.css";
import Header from "@layouts/Header";
import Footer from "@layouts/Footer";

import { Index } from "@pages/Index";
import { Dashboard } from "@pages/Dashboard";
import AddSetPage from "@pages/AddSet";
import EditSetPage from "@pages/EditSet";
import AddCardPage from "@pages/AddCard";
import EditCardPage from "@pages/EditCard";

import PageNotFound from "@pages/PageNotFound";
import SetPage from "@pages/Set";
import ViewCardsPage from "@pages/ViewCards";
import LoginPage from "@pages/Login";
import ProfilePage from "@pages/Profile";
import Register from "@pages/Register";

const App = () => {
  const { userSlug, token } = useAuthContext()!;
  let routes;

  if (!token) {
    routes = (
      <>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="*" element={<PageNotFound />} /> */}
        <Route path="/profile/:userSlug" element={<ProfilePage />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/dashboard/:userSlug" element={<Dashboard />} />
        <Route path="/profile/:userSlug" element={<ProfilePage />} />
        {/* <Route path="/set/:setId" element={<SetPage />} /> */}
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
