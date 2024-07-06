import { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import './App.scss';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import PageNotFound from './pages/PageNotFound';
import Index  from './pages/IndexPage';
import Register from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Profile from './pages/ProfilePage';
import Set from './pages/SetPage';
import CardAddEdit from './pages/CardAddEditPage';
import ViewCards from './pages/ViewCardsPage';
import AddSetPage from './pages/AddSetPage';
import EditSetPage from './pages/EditSetPage';

const App = () => {
  const {userId, token } = useContext(AuthContext)!;

  let routes;
  if (token) {
    routes = (
      <>
        <Route path='/profile' element={<Profile /> } />
        <Route path='/dashboard/:userId' element={<DashboardPage /> } />
        <Route path='/set/:setId/card/:cardId/:action' element={<CardAddEdit />} />
        <Route path='/set/:setId/card/:action' element={<CardAddEdit />} />
        <Route path='/set/:setId/cards' element={<ViewCards />} />
        <Route path='/set/:setId/edit' element={<EditSetPage />} />
        <Route path='/set/user/:userId/add' element={<AddSetPage />} />
        <Route path='/set/:setId' element={<Set /> } />
        <Route path='/' element={<Navigate to={`/dashboard/${userId}`} />} />
        <Route path="*" element={ <PageNotFound /> } />
      </>
    );
  } else {
    routes = (
      <>
        <Route path='/' element={<Index />} />
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