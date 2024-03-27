import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css'; // links css file at the same level
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
