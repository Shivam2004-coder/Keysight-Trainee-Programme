import React from 'react';
import ReactDOM from 'react-dom/client';
import StudentList from './StudentList';
import App from './ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);