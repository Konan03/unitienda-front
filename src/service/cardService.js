import api from '../api/api';

export const guardarTarjeta = async (tarjetaRequest) => {
  try {
    const response = await api.post('/tarjeta/guardar', tarjetaRequest);
    return response.data;
  } catch (error) {
    console.error('Error al guardar tarjeta:', error);
    throw error;
  }
};

// Obtener todas las tarjetas del usuario autenticado
export const obtenerTarjetasUsuario = async () => {
  try {
    const response = await api.get('/tarjeta/obtener');
    return response.data;
  } catch (error) {
    console.error('Error al obtener tarjetas del usuario:', error);
    throw error;
  }
};

// Actualizar una tarjeta existente
export const actualizarTarjeta = async (tarjetaId, tarjetaRequest) => {
  try {
    const response = await api.put(`/tarjeta/actualizar/${tarjetaId}`, tarjetaRequest);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar tarjeta:', error);
    throw error;
  }
};

// Eliminar una tarjeta por ID
export const eliminarTarjeta = async (tarjetaId) => {
  try {
    const response = await api.delete(`/tarjeta/eliminar/${tarjetaId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar tarjeta:', error);
    throw error;
  }
};

// Obtener tarjetas por tipo de tarjeta
export const obtenerTarjetasPorTipo = async (tipoTarjeta) => {
  try {
    const response = await api.get('/tarjeta/obtenerPorTipo', {
      params: { tipoTarjeta }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener tarjetas por tipo:', error);
    throw error;
  }
};