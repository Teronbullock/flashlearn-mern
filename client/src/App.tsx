import { useContext, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import Index  from './routes/Index';
import Register from './routes/Register';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import Profile from './routes/Profile';
import { AuthContextProvider, AuthContext } from './context/auth-context';


// import Card from './routes/Card';
// import Cards from './routes/Cards';
// import CreateSet from './routes/CreateSet';
// import Set from './routes/Set';


import './App.scss';

export default function App() {

  return (
    <AuthContextProvider>
      <Header />
      <MainRoutes />
      <Footer />
    </AuthContextProvider>
  )
}


const MainRoutes = () => {
  const { token } = useContext(AuthContext)!;

  useEffect(() => {
    console.log('Token in App: ', token); 
  }, [token]);

  return (
    <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      {/* Protected Routes */}
      <Route path='/dashboard' element={token ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path='/profile' element={token ? <Profile /> : <Navigate to="/login" />} />
    </Routes>
  );
};