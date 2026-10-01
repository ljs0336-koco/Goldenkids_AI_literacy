import React from 'react';
import { HashRouter } from 'react-router-dom';
import AppRoutes from './routes';
import '../styles/global.css';

export default function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}
