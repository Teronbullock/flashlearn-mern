import { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import './App.scss';
import Header from './components-layouts/Header/Header';
import Footer from './components-layouts/Footer/Footer';
import PageNotFound from './routes/PageNotFound';
import Index  from './routes/IndexPage';
import Register from './routes/RegisterPage';
import Login from './routes/LoginPage';
import Dashboard from './routes/DashboardPage';
import Profile from './routes/ProfilePage';
import Set from './routes/SetPage';
import CardAddEdit from './routes/CardAddEditPage';
// import CreateSet from './routes/SetCreatePage';
// import EditSet from './routes/SetEditPage';
// import Card from './routes/Card';
// import Cards from './routes/Cards';
// import CreateSet from './routes/CreateSet';
// import Set from './routes/Set';


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

      {/* <Route path='/set/:setId/edit' element={<EditSet /> } />
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