<template>
  <h2 class="text-profile">Pedidos</h2>
  <v-card class="mx-auto pa-5 main-card" max-width="1300">
    <v-container class="orders-container" fluid>
      <!-- Renderizado condicional para mostrar pedidos o mensaje vacío -->
      <template v-if="orders.length > 0">
        <CardOrder 
          v-for="(order, index) in orders" 
          :key="index" 
          :order="formatOrder(order)" 
        />
      </template>
      <template v-else>
        <p class="no-orders-text">No tienes pedidos aún.</p>
      </template>
    </v-container>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CardOrder from './CardOrder.vue';
import orderService from '@/service/orderService.js';

const orders = ref([]); // Estado para almacenar las órdenes

// Obtener las órdenes del usuario cuando el componente se monta
onMounted(async () => {
  try {
    orders.value = await orderService.obtenerOrdenesUsuario();
    console.log("Órdenes obtenidas:", orders.value);
  } catch (error) {
    console.error("Error al obtener las órdenes del usuario:", error);
  }
});

// Formatear cada orden para asegurar la estructura de datos
const formatOrder = (order) => {
  // Agregar validación y valor predeterminado para los datos de cada orden
  return {
    ...order,
    producto: order.producto || {
      nombre: "Producto desconocido",
      imagenes: [], // Si no tiene imágenes, se asigna un array vacío
      precio: "N/A"
    },
    cantidad: order.cantidad || 1,
    fechaEntrega: order.fechaEntrega || "No disponible",
    fecha: order.fecha || "No disponible",
    total: order.total || 0,
    estado: order.estado || "Pendiente"
  };
};
</script>

<style scoped>
.main-card {
  border: 2px solid #12223d;
  max-height: 609px;
  overflow-y: auto;
}

.orders-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.text-profile {
  font-size: 60px;
  color: #fab400;
  margin-bottom: 19px;
  margin-left: 70px;
}

.no-orders-text {
  text-align: center;
  color: #aaa;
  font-size: 18px;
  padding: 20px;
}
</style>
