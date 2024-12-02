// usuarioService.js
import api from '../api/api';

// Registrar un nuevo usuario
export const registerUser = async (usuario) => {
  try {
    const response = await api.post('/usuarios/registro', usuario);
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw error;
  }
};

// Iniciar sesión del usuario y obtener token
export const loginUser = async (authCredentials) => {
  try {
    const response = await api.post('/usuarios/login', authCredentials);
    const token = response.data.token; // Ajusta esto según la estructura de la respuesta
    localStorage.setItem('token', token); // Guarda el token en formato de cadena
    return token;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};
  
// Actualizar la información del usuario
export const updateUser = async (id, updatedInfo) => {
  try {
    const response = await api.put(`/usuarios/${id}`, updatedInfo);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/usuarios/me');
    return response.data;
  } catch (error) {
    console.error('Error al obtener el usuario actual:', error);
    throw error;
  }
};

// Obtener usuario por ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    throw error;
  }
};


// Obtener todos los clientes
export const getAllClientes = async () => {
  try {
    const response = await api.get('/usuarios/clientes');
    return response.data;
  } catch (error) {
    console.error('Error al obtener todos los clientes:', error);
    throw error;
  }
};

// Cerrar sesión
export const logout = async () => {
  try {
    const response = await api.post('/usuarios/logout');
    return response.data; // Mensaje de confirmación de logout
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};

// Enviar código de restablecimiento de contraseña
export const sendResetPasswordCode = async (email) => {
  try {
    const response = await api.post('/usuarios/sendResetPasswordCode', { email });
    return response.data;
  } catch (error) {
    console.error('Error al enviar código de restablecimiento de contraseña:', error);
    throw error;
  }
};

// Verificar código de restablecimiento de contraseña
export const verifyResetPasswordCode = async (email, code) => {
  try {
    const response = await api.post('/usuarios/verifyResetPasswordCode', { email, code });
    return response.data;
  } catch (error) {
    console.error('Error al verificar el código de restablecimiento de contraseña:', error);
    throw error;
  }
};

// Restablecer la contraseña
export const resetPassword = async (email, newPassword) => {
  try {
    const response = await api.put('/usuarios/resetPassword', { email, newPassword });
    return response.data;
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    throw error;
  }
};

export const completeUserProfile = async (userProfileData) => {
  try {
    const response = await api.put('/usuarios/completarPerfil', userProfileData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al completar perfil del usuario:', error);
    throw error;
  }
};

