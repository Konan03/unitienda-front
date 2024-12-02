import api from '../api/api';



const orderService = {
  // Crear una nueva orden desde el carrito
  async crearOrdenDesdeCarrito(direccionId, tarjetaId, metodoPago, subtotal) {
    try {
      const response = await api.post('/ordenes/crearDesdeCarrito', null, {
        params: {
          direccionId,
          tarjetaId,
          metodoPago,
          subtotal
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear la orden desde el carrito:", error);
      throw error;
    }
  },

  // Obtener detalles de una orden específica
  async obtenerOrden(ordenId) {
    try {
      const response = await api.get(`/ordenes/${ordenId}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener la orden con ID ${ordenId}:`, error);
      throw error;
    }
  },

  // Actualizar el estado de una orden
  async actualizarEstadoOrden(ordenId, nuevoEstado) {
    try {
      const response = await api.put(`/ordenes/${ordenId}/estado`, null, {
        params: { nuevoEstado }
      });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el estado de la orden:", error);
      throw error;
    }
  },

  // Obtener todas las órdenes de un usuario
  async obtenerOrdenesUsuario() {
    try {
      const response = await api.get('/ordenes/usuario');
      return response.data;
    } catch (error) {
      console.error("Error al obtener las órdenes del usuario:", error);
      throw error;
    }
  },

  // Obtener todas las órdenes (para administradores)
  async obtenerTodasLasOrdenes() {
    try {
      const response = await api.get('/ordenes/admin/todas');
      return response.data;
    } catch (error) {
      console.error("Error al obtener todas las órdenes:", error);
      throw error;
    }
  },

  // Cancelar una orden
  async cancelarOrden(ordenId) {
    try {
      const response = await api.put(`/ordenes/${ordenId}/cancelar`);
      return response.data;
    } catch (error) {
      console.error(`Error al cancelar la orden con ID ${ordenId}:`, error);
      throw error;
    }
  },

  // Eliminar una orden
  async eliminarOrden(ordenId) {
    try {
      await api.delete(`/ordenes/${ordenId}/eliminar`);
    } catch (error) {
      console.error(`Error al eliminar la orden con ID ${ordenId}:`, error);
      throw error;
    }
  },

  // Descargar la factura de una orden en formato PDF
  async descargarFactura(ordenId) {
    try {
      const response = await api.get(`/ordenes/${ordenId}/descargarFactura`, {
        responseType: 'blob', // Necesario para descargar archivos
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Factura_Orden_${ordenId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al descargar la factura:", error);
      throw error;
    }
  }
};

export default orderService;
