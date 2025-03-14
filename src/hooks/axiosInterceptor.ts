import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const axiosInterceptor = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInterceptor.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); 

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        window.location.href = '/signin';
        return Promise.reject(new Error('Token expirado, redirigiendo a login.'));
      }

      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      localStorage.removeItem('token');
      window.location.href = '/signin';
      return Promise.reject(new Error('Error en el token, redirigiendo a login.'));
    }
  }

  return config;
}, error => {
  return Promise.reject(error);
});

axiosInterceptor.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      console.error('Error de conexión con el servidor:', error);
      localStorage.removeItem('token'); 
      window.location.href = '/internalserver'; 
      return Promise.reject(new Error('Servidor no disponible, redirigiendo a error500.'));
    }

    if (error.response.status === 500) {
      console.error('Error 500: Problema en el servidor');
      localStorage.removeItem('token');
      window.location.href = '/internalserver';
    }

    return Promise.reject(error);
  }
);

export default axiosInterceptor;
