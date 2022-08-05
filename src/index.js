import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MainStore, MainStoreContext } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MainStoreContext.Provider value={new MainStore()}>
    <App />
  </MainStoreContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
