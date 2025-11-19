import React from 'react';
import { useAuth } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthenticatedApp from './components/AuthenticatedApp';
import UnauthenticatedApp from './components/UnauthenticatedApp';

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Router>
  );
}