import api from '../api/api';

const paymentService = {
    // Función para crear un nuevo pago
    async crearPago(ordenId, monto, metodoPago) {
      try {
        const response = await api.post('/pagos/crear', null, {
          params: {
            ordenId,
            monto,
            metodoPago,
          },
        });
        return response.data; // Devuelve la respuesta del backend con el pago creado
      } catch (error) {
        console.error("Error al crear el pago:", error);
        throw error;
      }
    },
  
    // Función para actualizar el estado de un pago
    async actualizarEstadoPago(pagoId, nuevoEstado) {
      try {
        const response = await api.put(`/pagos/${pagoId}/actualizarEstado`, null, {
          params: {
            nuevoEstado,
          },
        });
        return response.data; // Devuelve la respuesta del backend con el pago actualizado
      } catch (error) {
        console.error("Error al actualizar el estado del pago:", error);
        throw error;
      }
    }
  };
  
  export default paymentService