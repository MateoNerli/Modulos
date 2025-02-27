import axios from 'axios';

const axiosInterceptor = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Elimina el espacio extra
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInterceptor.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInterceptor;