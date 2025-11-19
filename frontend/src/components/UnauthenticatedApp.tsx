// frontend/src/components/UnauthenticatedApp.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import RegisterUser from '../pages/RegisterUser';
import RegisterCompany from '../pages/RegisterCompany';

export default function UnauthenticatedApp() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register/user" element={<RegisterUser />} />
      <Route path="/register/company" element={<RegisterCompany />} />
      {/* Redirect any other route to the login page */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
