import { useContext, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import Header from './components-layouts/Header/Header';
import Footer from './components-layouts/Footer/Footer';
import Index  from './routes/IndexPage';
import Register from './routes/RegisterPage';
import Login from './routes/LoginPage';
import Dashboard from './routes/DashboardPage';
import Profile from './routes/ProfilePage';
import Set from './routes/Set/SetPage';
import CreateSet from './routes/Set/CreateSetPage';
import EditSet from './routes/Set/EditSetPage';
import Cards from './routes/Cards/CardsPage';
import { AuthContextProvider, AuthContext } from './context/AuthContext';
import AddCard from './routes/Cards/AddCardPage';
// import Card from './routes/Card';
// import Cards from './routes/Cards';
// import CreateSet from './routes/CreateSet';
// import Set from './routes/Set';


const App = () => {
  return (
    <AuthContextProvider>
      <Header />
      <MainRoutes />
      <Footer />
    </AuthContextProvider>
  );
}

const MainRoutes = () => {
  const { token, login, userId } = useContext(AuthContext)!;

  useEffect(() => {
    const storeDataString = localStorage.getItem('flashlearn_userData');
    
    if (storeDataString ) {
      const storedData = JSON.parse(storeDataString);
      const { token, userId, expiration } = storedData;
      const isExpirationValid = new Date(expiration) > new Date();

      if (token && isExpirationValid) {
        login?.(userId, token, new Date(expiration));
      }
    }
  }, [token, login]);


  return (
    <Routes>
      { token ? (
          <>
            <Route path='/dashboard' element={<Navigate to={`/dashboard:${userId}`} /> } />
            <Route path={`/dashboard:${userId}`} element={<Dashboard /> } />
            <Route path='/profile' element={<Profile /> } />
            <Route path='/set' element={<Navigate to={`/set:setNumber`} />} />
            <Route path='/set/:setId' element={<Set /> } />
            <Route path='/set/:setId/edit' element={<EditSet /> } />
            <Route path='/set/create' element={<CreateSet />} />
            <Route path='/set/:setId/cards/?page=1' element={<Cards />} />
            <Route path='/set/:setId/card/add' element={<AddCard />} />
            <Route path='/' element={<Navigate to={`/dashboard:${userId}`} />} />
            {/* <Route path="*" element={ <Navigate to={`/dashboard:${userId}`} /> } /> */}
          </>
        ) : (
          <>
            <Route path='/' element={<Index />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path="*" element={ <Navigate to="/" /> } />
          </>
        )
      }
    </Routes>
  );
};

export default App;