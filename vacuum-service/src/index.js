import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

axios.interceptors.request.use(

  config =>{
      const token = localStorage.getItem('jwt');
      if(token)
      {
          config.headers['Authorization'] = 'Bearer '+token;
      }
      return config
  },
  (err) => {
      return Promise.reject(err);
   }
);

axios.interceptors.response.use(

  config =>{
      const token = localStorage.getItem('jwt');
      if(token)
      {
          config.headers['Authorization'] = 'Bearer '+token;
      }
      return config
  },
  (err) => {
      return Promise.reject(err);
   }
);
