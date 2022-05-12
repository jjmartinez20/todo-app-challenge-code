import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = (): JSX.Element => {
  return <>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/app" element={<PrivateRoute />}>
        <Route path='/app/home' element={<Home />} />
      </Route>
    </Routes>
  </>;
}

export default App;
