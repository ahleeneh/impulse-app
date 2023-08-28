import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import Navigation from './components/Navigation';

function App() {

  return (
    <BrowserRouter>
      <main>

        <Navigation/>

        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
          <Route path='/dashboard' element={<DashboardPage/>}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );

}

export default App;