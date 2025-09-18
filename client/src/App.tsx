import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from '@hooks/useAuthContext';
import './App.css';
import Header from '@layouts/Header/Header';
import Footer from '@layouts/Footer/Footer';

import IndexPage from '@pages/IndexPage';
import DashboardPage from '@pages/DashboardPage';
import AddSetPage from '@pages/AddSetPage';
import EditSetPage from '@pages/EditSetPage';
import AddCardPage from '@pages/AddCardPage';
import EditCardPage from '@pages/EditCardPage';

import PageNotFound from '@pages/PageNotFound';
import SetPage from '@pages/SetPage';
import ViewCardsPage from '@pages/ViewCardsPage';
import LoginPage from '@pages/LoginPage';
import ProfilePage from '@pages/ProfilePage';
import Register from '@pages/RegisterPage';

const App = () => {
  const { userSlug, token } = useAuthContext()!;
  let routes;

  if (token) {
    routes = (
      <>
        <Route path='/dashboard/:userSlug' element={<DashboardPage />} />
        <Route path='/profile/:userSlug' element={<ProfilePage />} />
        <Route path='/set/:setId' element={<SetPage />} />
        <Route path='/set/user/:userSlug/add' element={<AddSetPage />} />
        <Route path='/set/:setId/edit' element={<EditSetPage />} />
        <Route path='/set/:setId/card/add' element={<AddCardPage />} />
        <Route
          path='/set/:setId/card/:cardId/edit'
          element={<EditCardPage />}
        />
        <Route path='/set/:setId/cards' element={<ViewCardsPage />} />
        <Route path='/' element={<Navigate to={`/dashboard/${userSlug}`} />} />
        <Route path='*' element={<PageNotFound />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path='/' element={<IndexPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<PageNotFound />} />
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
