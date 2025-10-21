import React, { useState } from 'react';
import RegisterUser from './pages/RegisterUser';
import RegisterCompany from './pages/RegisterCompany';
export default function App(){
  const [mode, setMode] = useState<'user'|'company'>('user');
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-2xl mx-auto mb-6">
        <h1 className="text-2xl font-bold">LavaJá — Cadastro (MVP)</h1>
        <div className="mt-4 space-x-2">
          <button onClick={()=>setMode('user')} className={`px-3 py-1 rounded ${mode==='user'?'bg-blue-600 text-white':'bg-white'}`}>Usuário</button>
          <button onClick={()=>setMode('company')} className={`px-3 py-1 rounded ${mode==='company'?'bg-blue-600 text-white':'bg-white'}`}>Empresa</button>
        </div>
      </header>
      <main className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        {mode === 'user' ? <RegisterUser /> : <RegisterCompany />}
      </main>
    </div>
  );
}
