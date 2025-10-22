import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  type: 'user' | 'company';
}

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se há token no localStorage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error('Erro ao parsear dados do usuário:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="rounded-xl shadow-lg overflow-hidden">
                <img 
                  src="/src/assets/logo.jpeg" 
                  alt="LavaJá Logo" 
                  className="w-10 h-10 object-cover rounded-xl"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">LavaJá</h1>
                <p className="text-sm text-gray-600">
                  {user?.type === 'company' ? 'Painel Empresarial' : 'Área do Cliente'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bem-vindo ao LavaJá!
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {user?.type === 'company' 
                ? 'Sua empresa foi cadastrada com sucesso. Em breve você terá acesso a todas as funcionalidades do painel empresarial.'
                : 'Sua conta foi criada com sucesso. Em breve você terá acesso a todos os serviços de lavagem de carros.'
              }
            </p>

            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                🚀 Próximos Passos
              </h3>
              <ul className="text-blue-800 text-left max-w-md mx-auto space-y-2">
                {user?.type === 'company' ? (
                  <>
                    <li>• Configurar perfil da empresa</li>
                    <li>• Adicionar serviços oferecidos</li>
                    <li>• Configurar localização</li>
                    <li>• Gerenciar agendamentos</li>
                  </>
                ) : (
                  <>
                    <li>• Explorar serviços disponíveis</li>
                    <li>• Agendar lavagem de carro</li>
                    <li>• Acompanhar histórico</li>
                    <li>• Avaliar serviços</li>
                  </>
                )}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Cadastrar outro usuário
              </button>
              
              <button
                onClick={() => navigate('/login')}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Fazer login diferente
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
