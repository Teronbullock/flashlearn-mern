import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/hooks/useAuthContext';
import './App.scss';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';

import IndexPage from './pages/IndexPage';
import DashboardPage from './features/sets/pages/DashboardPage';
import AddSetPage from './features/sets/pages/AddSetPage';
import EditSetPage from './features/sets/pages/EditSetPage';
import AddCardPage from './features/cards/pages/AddCardPage';
import EditCardPage from './features/cards/pages/EditCardPage';

import PageNotFound from './pages/PageNotFound';
import SetPage from './features/cards/pages/SetPage';
import ViewCardsPage from './features/cards/pages/ViewCardsPage';
import LoginPage from './features/user/page/LoginPage';
import ProfilePage from './features/user/page/ProfilePage';
import Register from './features/user/page/RegisterPage';

const App = () => {
  const {userSlug, token } = useAuthContext()!;
  let routes;
  
  if (token) {
    routes = (
      <>
        <Route path='/dashboard/:userSlug' element={<DashboardPage /> } />
        <Route path='/set/:setId' element={<SetPage /> } />
        <Route path='/set/user/:userSlug/add' element={<AddSetPage />} />
        <Route path='/set/:setId/edit' element={<EditSetPage />} />
        <Route path='/set/:setId/card/add' element={<AddCardPage />} />
        <Route path='/set/:setId/card/:cardId/edit' element={<EditCardPage />} />
        <Route path='/set/:setId/cards' element={<ViewCardsPage />} />
        <Route path='/profile/:userSlug' element={<ProfilePage /> } />
        <Route path='/' element={<Navigate to={`/dashboard/${userSlug}`} />} />
        <Route path="*" element={ <PageNotFound /> } />
      </>
    );
  } else {
    routes = (
      <>
        <Route path='/' element={<IndexPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path="*" element={ <PageNotFound /> } />
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
}

export default App;