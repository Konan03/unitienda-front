import api from '../api/api';

// Función para obtener todos los productos
export const obtenerProductos = async () => {
    try {
      const response = await api.get("/productos");
      return response.data;
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error;
    }
  };
  
  // Función para obtener un producto específico por su ID
  export const obtenerProductoPorId = async (id) => {
    try {
      const response = await api.get(`/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el producto con ID ${id}:`, error);
      throw error;
    }
  };
  
  // Función para agregar un nuevo producto
  export const agregarProducto = async (productoFormData) => {
    try {
      const response = await api.post("/productos/crear", productoFormData, {
        withCredentials: false  // Cambia a true si necesitas autenticación o credenciales
      });
      return response.data;
    } catch (error) {
      console.error("Error al agregar producto:", error);
      throw error;
    }
  };
  // Función para actualizar un producto existente
  export const actualizarProducto = async (id, formData) => {
    try {
        const response = await api.put(`/productos/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el producto con ID ${id}:`, error);
        throw error;
    }
};
  
  // Función para eliminar un producto
  export const eliminarProducto = async (id) => {
    try {
      const response = await api.delete(`/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar el producto con ID ${id}:`, error);
      throw error;
    }
  };

  // Obtener productos filtrados por colores
  // Función para filtrar productos por colores en una categoría específica
// productService.js

export const filtrarPorColores = async (colores, categoria = null) => {
  try {
    const params = {
      colores: colores.join(','),
    };

    if (categoria) {
      params.categoria = categoria; // Añade la categoría si se especifica
    }

    const response = await api.get('/productos/filtrarPorColores', { params });
    return response.data;
  } catch (error) {
    console.error('Error al filtrar productos por colores:', error);
    throw error;
  }
};


// Filtrar productos dentro de un rango de precios en una categoría específica
export const filtrarPorRangoDePrecios = async (precioMin, precioMax, categoria) => {
  try {
    const response = await api.get('/productos/filtrarPorRangoDePrecios', {
      params: { precioMin, precioMax, categoria }
    });
    return response.data;
  } catch (error) {
    console.error('Error al filtrar productos por rango de precios:', error);
    throw error;
  }
};

// Obtener productos con descuento disponible en una categoría específica
export const filtrarConDescuento = async (categoria = null) => {
  try {
    const params = categoria ? { categoria } : {};
    const response = await api.get('/productos/conDescuento', { params });
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos con descuento:', error);
    throw error;
  }
};
// Ajustes similares para las funciones de ordenamiento, pasándoles también la categoría:
export const ordenarPorPrecioAsc = async (categoria) => {
  try {
    const response = await api.get('/productos/ordenarPorPrecioAsc', { params: { categoria } });
    return response.data;
  } catch (error) {
    console.error('Error al ordenar productos por precio ascendente:', error);
    throw error;
  }
};

export const ordenarPorPrecioDesc = async (categoria) => {
  try {
    const response = await api.get('/productos/ordenarPorPrecioDesc', { params: { categoria } });
    return response.data;
  } catch (error) {
    console.error('Error al ordenar productos por precio descendente:', error);
    throw error;
  }
};

export const ordenarPorNombreAsc = async (categoria) => {
  try {
    const response = await api.get('/productos/ordenarPorNombreAsc', { params: { categoria } });
    return response.data;
  } catch (error) {
    console.error('Error al ordenar productos alfabéticamente:', error);
    throw error;
  }
};
// Obtener productos por categoría
export const getProductosPorCategoria = async (categoria) => {
  try {
    const response = await api.get('/productos/categoria', {
      params: { categoria }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos por categoría:', error);
    throw error;
  }
};