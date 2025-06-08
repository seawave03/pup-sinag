// src/index.jsx

// index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { HashRouter } from 'react-router-dom'; // <--- change here
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter> {/* use HashRouter */}
      <App />
    </HashRouter>
  </React.StrictMode>
);
