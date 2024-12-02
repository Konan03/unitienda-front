<template>
  <!-- Renderización del producto individual -->
  <v-card outlined class="pa-4 mb-4" style="border: 1px solid #797575; max-width: 350px; min-height: 150px;">
    <v-row class="d-flex justify-space-between">
      <!-- Imagen del producto -->
      <v-col cols="auto" style="min-height: 120px;">
        <v-img
          :src="getProductImage(product.producto?.imagenes, 0)"
          width="50"
          height="120"
          alt="Producto"
        ></v-img>
      </v-col>

      <!-- Descripción del producto -->
      <v-col class="d-flex flex-column justify-center">
        <span style="font-size: 1.5rem;">
          {{ product.producto?.nombre || 'Producto' }}
          <span v-if="product.cantidad > 1"> (x{{ product.cantidad }})</span>
        </span>
      </v-col>

      <!-- Precio y eliminar -->
      <v-col cols="auto" class="d-flex flex-column align-center justify-center">
        <v-btn icon @click="handleRemoveProduct(product.producto?.id)" class="mb-2">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <span style="color: #264983; font-size: 1.5rem;">{{ formatPrice(product.precioTotal || 0) }}</span>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { eliminarProductoDelCarrito } from '../../service/cartService.js'; // Importar la función eliminarProductoDelCarrito

// Recibe el producto como `prop`
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

// Definir el emisor de eventos
const emit = defineEmits(['remove-product']);

// Función para construir la URL de la imagen o usar una imagen predeterminada
const getProductImage = (imagenes, index) => {
  return (imagenes && imagenes.length > 0)
    ? `http://localhost:8080/images/${imagenes[index]}`
    : '/src/assets/img/libro.png';
};

// Función para manejar la eliminación del producto del carrito
const handleRemoveProduct = async (productoId) => {
  if (!productoId) return;
  try {
    await eliminarProductoDelCarrito(productoId);
    // Emitir un evento para notificar al componente padre que el producto fue eliminado
    emit('remove-product');
  } catch (error) {
    console.error('Error al intentar eliminar el producto:', error);
  }
};

// Formatear el precio
const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace(",00", "");
};
</script>

<style>
</style>
