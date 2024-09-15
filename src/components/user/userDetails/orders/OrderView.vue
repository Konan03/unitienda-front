<template>
  <h2 class="text-profile">Pedidos</h2>
  <v-card class="mx-auto pa-5 main-card" max-width="1300">
    <v-container class="orders-container" fluid>
      <!-- Aquí iteramos sobre los pedidos para mostrarlos -->
      <CardOrder v-for="(order, index) in orders" :key="index" />
    </v-container>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import CardOrder from "./CardOrder.vue";

// Ejemplo de pedidos, puedes reemplazarlo por datos reales
const orders = ref([
  { id: 1, description: "Pedido 1" },
  { id: 2, description: "Pedido 2" },
  { id: 3, description: "Pedido 3" },
  // Agrega más pedidos aquí
]);
</script>

<style scoped>
.main-card {
  border: 2px solid #12223d;
  max-height: 609px; /* Establece una altura máxima para que el contenido no se desborde */
  overflow-y: auto; /* Habilita el scroll vertical cuando hay muchos pedidos */
}

.orders-container {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Espacio entre los cards */
}

.data {
  font-size: 25px;
  margin-bottom: 108.5px;
}

.text-profile {
  font-size: 60px;
  color: #fab400;
  margin-bottom: 19px;
  margin-left: 70px;
}
</style>
