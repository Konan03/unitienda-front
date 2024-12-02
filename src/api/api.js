import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',  
  
  
});


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Incluye solo la cadena del token
      console.log("Token añadido en el header:", config.headers.Authorization); // Verificación
    } else {
      console.log("Token no encontrado en localStorage al intentar añadir en el header.");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;