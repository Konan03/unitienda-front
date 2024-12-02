import api from '../api/api';


// Agregar productos al carrito
export const agregarProductosAlCarrito = async (productos) => {
  try {
    const response = await api.post('/carrito/agregarProductos', productos, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error al agregar productos al carrito:', error);
    throw error;
  }
};

// Obtener el carrito completo
export const obtenerCarrito = async () => {
  try {
    const response = await api.get('/carrito/obtenerCarrito', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    throw error;
  }
};
// Actualizar la cantidad de un producto en el carrito
export const actualizarCantidadProducto = async (productoId, nuevaCantidad) => {
  try {
    const response = await api.put('/carrito/actualizarCantidad', null, {
      params: {
        productoId,
        nuevaCantidad,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la cantidad del producto en el carrito:', error);
    throw error;
  }
};

// Eliminar un producto del carrito
export const eliminarProductoDelCarrito = async (productoId) => {
  try {
    console.log("Intentando eliminar producto con ID:", productoId);
    console.log("Token actual en localStorage:", localStorage.getItem('token'));
    await api.delete('/carrito/eliminarProducto', {
      params: { productoId },
      withCredentials: true,
    });
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    throw error;
  }
};

// Obtener el total del carrito
export const obtenerTotalCarrito = async () => {
  try {
    const response = await api.get('/carrito/obtenerTotal', { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error al obtener el total del carrito:', error);
    throw error;
  }
};
