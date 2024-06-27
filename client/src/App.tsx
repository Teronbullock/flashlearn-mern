import { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import './App.scss';
import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import PageNotFound from './pages/PageNotFound';
import Index  from './pages/IndexPage';
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import Dashboard from './pages/DashboardPage';
import Profile from './pages/ProfilePage';
import Set from './pages/SetPage';
import CardAddEdit from './pages/CardAddEditPage';
// import CreateSet from './pages/SetCreatePage';
import EditSet from './pages/SetAddEditPage';

// import Cards from './pages/Cards';
// import CreateSet from './pages/CreateSet';
// import Set from './pages/Set';


const App = () => {
  const {userId, token } = useContext(AuthContext)!;

  let routes;
  if (token) {
    routes = (<>
    {console.log('Token:', Date() )}
      <Route path='/profile' element={<Profile /> } />
      <Route path='/dashboard/:userId' element={<Dashboard /> } />
      <Route path='/set/:setId' element={<Set /> } />
      <Route path='/set/:setId/card/:cardId/edit' element={<CardAddEdit />} />
      <Route path='/set/:setId/card/:cardId/add' element={<CardAddEdit />} />
      <Route path='/set/:setId/edit' element={<EditSet />} />

      {/*  } />
      <Route path='/set/create' element={<CreateSet />} />
      } />*/}
      <Route path="*" element={ <PageNotFound /> } />
      <Route path='/' element={<Navigate to={`/dashboard/${userId}`} />} />
    </>);
  } else {
    routes = (<>
      <Route path='/' element={<Index />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path="*" element={ <PageNotFound /> } />
    </>);
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