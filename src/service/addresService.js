import api from '../api/api';

export const crearDireccion = async (direccion) => {
    try {
      const response = await api.post('/direcciones/crearDireccion', direccion);
      return response.data;
    } catch (error) {
      console.error('Error al crear dirección:', error);
      throw error;
    }
  };
  
  // Obtener las direcciones del usuario autenticado
  export const obtenerDireccionesPorUsuario = async () => {
    try {
      const response = await api.get('/direcciones/usuario');
      return response.data;
    } catch (error) {
      console.error('Error al obtener direcciones del usuario:', error);
      throw error;
    }
  };
  
  // Editar una dirección existente
  export const editarDireccion = async (direccionId, nuevaDireccion) => {
    try {
      const response = await api.put(`/direcciones/editarDireccion/${direccionId}`, nuevaDireccion);
      return response.data;
    } catch (error) {
      console.error('Error al editar la dirección:', error);
      throw error;
    }
  };