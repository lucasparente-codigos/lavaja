import axios from 'axios';

const api = axios.create({
  // Use a URL do backend que configuramos
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
