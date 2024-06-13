import { useContext, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import Header from './components-layouts/Header/Header';
import Footer from './components-layouts/Footer/Footer';
import Index  from './routes/Index';
import Register from './routes/Register';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import Profile from './routes/Profile';
import Set from './routes/Set/Set';
import CreateSet from './routes/Set/CreateSet';
import EditSet from './routes/Set/EditSet';
import Cards from './routes/Cards/Cards';
import { AuthContextProvider, AuthContext } from './context/auth-context';

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
  const { token, login, userID } = useContext(AuthContext)!;

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
            <Route path='/dashboard' element={<Navigate to={`/dashboard:${userID}`} /> } />
            <Route path={`/dashboard:${userID}`} element={<Dashboard /> } />
            <Route path='/profile' element={<Profile /> } />
            <Route path='/set' element={<Navigate to={`/set:setNumber`} />} />
            <Route path='/set/:setNumber' element={<Set /> } />
            <Route path='/set/:setNumber/edit' element={<EditSet /> } />
            <Route path='/set/create' element={<CreateSet />} />
            <Route path='/set/4/cards/?page=1' element={<Cards />} />
            <Route path='/' element={<Navigate to={`/dashboard:${userID}`} />} />
            {/* <Route path="*" element={ <Navigate to={`/dashboard:${userID}`} /> } /> */}
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