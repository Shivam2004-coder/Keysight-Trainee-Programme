import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ControlledForm from './ControlledForm';
import UnControlledForm from './UnControlledForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UnControlledForm />
  </React.StrictMode>
);