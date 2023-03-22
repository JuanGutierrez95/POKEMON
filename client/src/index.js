import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import axios from 'axios';

//1ro: Cuando estoy en desarrollo
//axios.defaults.baseURL = "http://localhost:3001"

//2do:Cuando estoy en produccion
axios.defaults.baseURL = "https://pokemonback-end-production.up.railway.app"

ReactDOM.render(
  <Provider store={store} > 
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
