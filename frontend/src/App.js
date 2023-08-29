import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import BudgetPage from './pages/BudgetPage';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="App">
      <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

      <BrowserRouter>
        <div className="App-container">

          <main>
            <Routes>
              <Route path='/' element={<HomePage/>}></Route>
              <Route path='/register' element={<RegisterPage/>}></Route>
              <Route path='/dashboard' element={<DashboardPage/>}></Route>
              <Route path='/budget' element={<BudgetPage/>}></Route>
            </Routes>
          </main>

        </div>
      </BrowserRouter>

    </div>
  );

}

export default App;