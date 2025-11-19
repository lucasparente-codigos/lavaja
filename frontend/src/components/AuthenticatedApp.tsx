// frontend/src/components/AuthenticatedApp.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HomePage from '../pages/HomePage';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';
import Header from './Header';
import Footer from './Footer';

export default function AuthenticatedApp() {
  const { user } = useAuth();
  const homePath = user?.type === 'company' ? '/dashboard' : '/home';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to={homePath} replace />} />
          <Route 
            path="/home" 
            element={user?.type !== 'company' ? <HomePage /> : <Navigate to="/dashboard" replace />} 
          />
          
          {/* Dashboard route only for companies */}
          <Route 
            path="/dashboard" 
            element={user?.type === 'company' ? <DashboardPage /> : <Navigate to="/home" replace />} 
          />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Redirect login/register routes to the appropriate home if already authenticated */}
          <Route path="/login" element={<Navigate to={homePath} replace />} />
          <Route path="/register" element={<Navigate to={homePath} replace />} />
          
          {/* Fallback to the appropriate home */}
          <Route path="*" element={<Navigate to={homePath} replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
