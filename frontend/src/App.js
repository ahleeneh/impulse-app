import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import Navigation from './components/Navigation';

function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <div className="App-container">

          <main>
            {/* <Navigation/> */}

            <Routes>
              <Route path='/' element={<HomePage/>}></Route>
              <Route path='/register' element={<RegisterPage/>}></Route>
              <Route path='/dashboard' element={<DashboardPage/>}></Route>
            </Routes>
          </main>

        </div>
      </BrowserRouter>

    </div>
  );

}

export default App;