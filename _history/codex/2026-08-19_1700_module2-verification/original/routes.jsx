import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import FairnessLabPage from '../features/fairness/FairnessLabPage';
import RoleLabPage from '../features/role/RoleLabPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fairness" element={<FairnessLabPage />} />
      <Route path="/role" element={<RoleLabPage />} />
    </Routes>
  );
}
