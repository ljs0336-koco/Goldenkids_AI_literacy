import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Portal from './Portal';
import Home from './Home';
import FairnessLabPage from '../features/fairness/FairnessLabPage';
import VerificationLabPage from '../features/verification/VerificationLabPage';
import RoleLabPage from '../features/role/RoleLabPage';
import AgentLabPage from '../features/agent/AgentLabPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Portal />} />
      <Route path="/literacy" element={<Home />} />
      <Route path="/fairness" element={<FairnessLabPage />} />
      <Route path="/verification" element={<VerificationLabPage />} />
      <Route path="/role" element={<RoleLabPage />} />
      <Route path="/agent" element={<AgentLabPage />} />
    </Routes>
  );
}
