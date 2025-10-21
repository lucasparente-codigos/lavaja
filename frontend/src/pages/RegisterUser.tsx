import React, { useState } from 'react';
import axios from 'axios';
export default function RegisterUser(){
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:4000/api/users/register', form);
      alert('Usuário cadastrado!');
      setForm({ name:'', email:'', password:'' });
    } catch (err:any) {
      alert(err?.response?.data?.error || 'Erro');
    } finally { setLoading(false); }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input className="w-full p-2 border rounded" placeholder="Nome" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
      <input className="w-full p-2 border rounded" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
      <input className="w-full p-2 border rounded" placeholder="Senha" type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
      <button disabled={loading} className="w-full p-2 rounded bg-blue-600 text-white">{loading? 'Cadastrando...' : 'Cadastrar Usuário'}</button>
    </form>
  );
}
