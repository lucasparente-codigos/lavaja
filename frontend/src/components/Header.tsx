import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img 
              className="h-8 w-auto" 
              src="logo.jpeg" 
              alt="LavaJá Logo" 
            />
            <span className="ml-3 text-xl font-bold text-gray-900">LavaJá</span>
          </div>

          {/* Navegação e Perfil */}
          <div className="flex items-center">
            <nav className="hidden md:flex space-x-4 mr-6">
              <a href="/home" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Home</a>
              {user?.type === 'company' && (
                <a href="/dashboard" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
              )}
              {/* Adicionar outros links de navegação aqui se necessário */}
            </nav>

            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  Olá, {user.name.split(' ')[0]} ({user.type === 'user' ? 'Cliente' : 'Empresa'})
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
