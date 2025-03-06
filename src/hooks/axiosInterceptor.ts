import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

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
      const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        // Token expirado
        localStorage.removeItem('token'); // Eliminar token
        window.location.href = '/signin'; // Redirigir a login
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

export default axiosInterceptor;
