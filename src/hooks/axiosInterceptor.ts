import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const axiosInterceptor = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de solicitud (Verifica token antes de enviar la petición)
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

// Interceptor de respuesta (Maneja errores 500 y problemas de conexión)
axiosInterceptor.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      console.error('Error de conexión con el servidor:', error);
      localStorage.removeItem('token'); // Borra el token si el servidor está caído
      window.location.href = '/error500'; // Redirige a la página de error
      return Promise.reject(new Error('Servidor no disponible, redirigiendo a error500.'));
    }

    if (error.response.status === 500) {
      console.error('Error 500: Problema en el servidor');
      localStorage.removeItem('token');
      window.location.href = '/error500';
    }

    return Promise.reject(error);
  }
);

export default axiosInterceptor;
