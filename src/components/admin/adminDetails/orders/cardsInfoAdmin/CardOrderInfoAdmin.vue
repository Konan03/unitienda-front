<template>
  <v-card class="pa-3 card-address" max-width="1000px">
    <!-- Título del pedido y número de pedido en la misma línea -->
    <v-card-title class="justify-space-between d-flex align-center">
      <span>Pedido <strong>{{ order.numeroPedido }}</strong></span>
    </v-card-title>
    <v-row>
      <!-- Columna para "Entrega hasta" alineada a la izquierda -->
      <v-col cols="6" class="d-flex align-center">
        <p class="subtitle mb-0">
          Entrega hasta el {{ formatDate(order.fechaMaximaEntrega) }}
        </p>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-end">
        
      </v-col>
    </v-row>

    <v-card-text class="text-card">
      <v-row class="header-row">
        <v-col cols="3"><strong class="column-title">Producto</strong></v-col>
        <v-col cols="3"><strong class="column-title">Precio</strong></v-col>
        <v-col cols="3"><strong class="column-title">Cantidad</strong></v-col>
        <v-col cols="3"><strong class="column-title">Subtotal</strong></v-col>
      </v-row>

      <!-- Iteración sobre cada producto en order.detalles -->
      <v-row v-for="(detalle, index) in order.detalles" :key="index">
        <v-col cols="3" class="d-flex align-center">
          <img
            :src="getProductImage(detalle.producto.imagenes)"
            alt="Imagen de producto"
            class="product-image"
          />
          <div class="ml-2">{{ detalle.producto.nombre }}</div>
        </v-col>
        <v-col cols="3" class="d-flex align-center">
          <div>{{ formatCurrency(detalle.producto.precioConDescuento) }}</div>
        </v-col>
        <v-col cols="3" class="d-flex align-center">
          <div>{{ detalle.cantidad }} ud.</div>
        </v-col>
        <v-col cols="3" class="d-flex align-center">
          <div>{{ formatCurrency(detalle.precioTotal) }}</div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue';

// Definir la prop 'order' como un objeto completo
const props = defineProps({
  order: {
    type: Object,
    required: true,
    default: () => ({
      numeroPedido: 'Sin ID',
      fechaMaximaEntrega: 'No disponible',
      detalles: [
        {
          producto: {
            nombre: 'Producto desconocido',
            precioConDescuento: 0,
            imagenes: [],
          },
          cantidad: 1,
          precioTotal: 0,
        },
      ],
    }),
  },
});

// Función para obtener la primera imagen del producto si existe
const getProductImage = (imagenes) => {
  return imagenes && Array.isArray(imagenes) && imagenes.length > 0
    ? `http://localhost:8080/images/${imagenes[0]}`
    : '/src/assets/img/default.png';
};

// Función para formatear la fecha
const formatDate = (dateString) => {
  if (!dateString) return 'No disponible';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
</script>

<style scoped>
.card-address {
  margin-bottom: 10px;
  border: 2px solid #979797;
}

.text-card {
  color: #486594;
}

.subtitle {
  font-size: 18px;
  color: #0f1f39;
  margin-left: 15px;
}

.tracking-section {
  color: #0f1f39;
  margin-right: 20px;
}

.column-title {
  color: #fab400;
}

.product-image {
  max-width: 50px;
  margin-right: 10px;
}

.d-flex {
  display: flex;
  align-items: center;
}

.ml-2 {
  margin-left: 10px;
}
</style>
