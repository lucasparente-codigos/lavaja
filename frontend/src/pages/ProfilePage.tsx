// frontend/src/pages/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { FormContainer } from '../components/FormContainer';

// Define initial states outside the component
const initialDetailsState = {
  name: '',
  phoneNumber: '',
  message: '',
  error: '',
};

const initialPasswordState = {
  code: '',
  newPassword: '',
  confirmPassword: '',
  message: '',
  error: '',
  isCodeSent: false,
};

const ProfilePage: React.FC = () => {
  const { user, setUser } = useAuth();

  const [detailsState, setDetailsState] = useState(initialDetailsState);
  const [passwordState, setPasswordState] = useState(initialPasswordState);

  useEffect(() => {
    if (user) {
      setDetailsState((prevState) => ({ 
        ...prevState, 
        name: user.name,
        phoneNumber: user.phoneNumber || '+55'
      }));
    }
  }, [user]);

  const handleUpdateDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setDetailsState((s) => ({ ...s, error: '', message: '' }));

    try {
      // Assuming an endpoint to update the phone number exists or will be added
      const response = await api.put('/profile/details', { 
        name: detailsState.name,
        phoneNumber: detailsState.phoneNumber
      });

      if (response.data.success) {
        const updatedUser = { ...user!, ...response.data.data };
        setUser(updatedUser);
        setDetailsState((s) => ({ ...s, message: 'Dados atualizados com sucesso!' }));
      }
    } catch (err: any) {
      setDetailsState((s) => ({ ...s, error: err.response?.data?.error || 'Erro ao atualizar o perfil.' }));
    }
  };

  const handleRequestCode = async () => {
    setPasswordState((s) => ({ ...initialPasswordState, isCodeSent: s.isCodeSent, message: '', error: '' }));
    try {
      const response = await api.post('/profile/request-password-reset', { phoneNumber: user?.phoneNumber });
      if (response.data.success) {
        setPasswordState((s) => ({
          ...s,
          isCodeSent: true,
          message: response.data.data.message,
        }));
      }
    } catch (err: any) {
      setPasswordState((s) => ({ ...s, error: err.response?.data?.error || 'Erro ao solicitar o código.' }));
    }
  };

  const handleCancelReset = () => {
    setPasswordState(initialPasswordState);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordState((s) => ({ ...s, error: '', message: '' }));

    if (passwordState.newPassword !== passwordState.confirmPassword) {
      setPasswordState((s) => ({ ...s, error: 'As senhas não coincidem.' }));
      return;
    }

    try {
      const response = await api.post('/profile/reset-password', {
        token: passwordState.code, // The 6-digit code is sent as 'token'
        newPassword: passwordState.newPassword,
      });
      if (response.data.success) {
        const successMessage = 'Senha alterada com sucesso!';
        handleCancelReset();
        setPasswordState((s) => ({ ...initialPasswordState, message: successMessage }));
      }
    } catch (err: any) {
      setPasswordState((s) => ({ ...s, error: err.response?.data?.error || 'Erro ao alterar a senha.' }));
    }
  };

  if (!user) {
    return <div className="text-center p-10">Carregando...</div>;
  }

  return (
    <FormContainer>
      <div className="container mx-auto mt-10 p-4">
        <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleUpdateDetails}>
            <h2 className="text-2xl font-semibold mb-4">Alterar Dados</h2>

            {detailsState.message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{detailsState.message}</div>}
            {detailsState.error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{detailsState.error}</div>}

            <InputField
              label="Nome"
              type="text"
              value={detailsState.name}
              onChange={(value) => setDetailsState((s) => ({ ...s, name: value }))}
              required
            />
            <div className="mt-4">
              <InputField
                label="Número de Celular"
                type="tel"
                value={detailsState.phoneNumber}
                onChange={(value) => setDetailsState((s) => ({ ...s, phoneNumber: value }))}
                required
              />
            </div>

            <div className="mt-6">
              <Button type="submit">Salvar Alterações</Button>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          {!passwordState.isCodeSent ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Alterar Senha</h2>
              {passwordState.message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{passwordState.message}</div>}
              {passwordState.error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{passwordState.error}</div>}
              
              <p className="text-gray-600 mb-4">
                Um código de 6 dígitos será enviado para o seu celular para confirmar a alteração de senha.
              </p>
              <InputField
                label="Confirmar Número de Celular"
                type="tel"
                value={user.phoneNumber || ''}
                disabled={true}
                onChange={() => {}}
              />
              <div className="mt-4">
                <Button onClick={handleRequestCode}>Enviar Código via SMS</Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleResetPassword}>
              <h2 className="text-2xl font-semibold mb-4">Redefinir Senha</h2>

              {passwordState.message && <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4">{passwordState.message}</div>}
              {passwordState.error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{passwordState.error}</div>}

              <InputField
                label="Código de 6 dígitos"
                type="text"
                value={passwordState.code}
                onChange={(value) => setPasswordState((s) => ({ ...s, code: value }))}
                required
              />
              <div className="mt-4">
                <InputField
                  label="Nova Senha"
                  type="password"
                  value={passwordState.newPassword}
                  onChange={(value) => setPasswordState((s) => ({ ...s, newPassword: value }))}
                  required
                />
              </div>
              <div className="mt-4">
                <InputField
                  label="Confirmar Nova Senha"
                  type="password"
                  value={passwordState.confirmPassword}
                  onChange={(value) => setPasswordState((s) => ({ ...s, confirmPassword: value }))}
                  required
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <Button type="submit">Alterar Senha</Button>
                <Button type="button" onClick={handleCancelReset} className="bg-gray-600 hover:bg-gray-700">
                  Cancelar
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </FormContainer>
  );
};

export default ProfilePage;
