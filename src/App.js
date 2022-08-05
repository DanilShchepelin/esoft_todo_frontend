import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import MainPage from './components/MainPage/MainPage';
import { useContext } from 'react';
import { MainStoreContext } from './store';
import {observer} from 'mobx-react';

function App() {
  const {AuthStore} = useContext(MainStoreContext);

  return (
    <BrowserRouter>
      <div className="App">
        {
          AuthStore.isLoggedIn ?
            <Routes>
              <Route path='/' element={<MainPage />} />
            </Routes>  :
            <Login />
        }
      </div>
    </BrowserRouter>
  );
}

export default observer(App);
