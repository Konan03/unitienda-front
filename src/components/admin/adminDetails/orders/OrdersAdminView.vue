<template>
  <h2 class="text-profile">Pedidos</h2>
  <v-card class="mx-auto pa-5" max-width="1300">
    <v-card-text class="scroll-container">
      <CardOrderAdmin
        class="card-order"
        v-for="(order, index) in orders"
        :key="index"
        :order="order" 
        :index="index + 1"
      />
    </v-card-text>
  </v-card>
</template>

<script setup>
import CardOrderAdmin from '@/components/admin/adminDetails/orders/CardOrderAdmin.vue';
import { ref, onMounted } from "vue";
import orderService from "@/service/orderService"; // Asegúrate de que la ruta es correcta

// Variable reactiva para almacenar las órdenes obtenidas del servidor
const orders = ref([]);

// Función para obtener las órdenes desde el servidor
const fetchOrders = async () => {
  try {
    orders.value = await orderService.obtenerTodasLasOrdenes();
  } catch (error) {
    console.error("Error al obtener todas las órdenes:", error);
  }
};

// Llama a fetchOrders cuando el componente se monta
onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
.v-card {
  border: 2px solid #12223d;
}

.card-order {
  border: 1px solid #ddd;
}

.data {
  font-size: 25px;
  margin-bottom: 108.5px;
}

.text-profile {
  font-size: 60px;
  color: #FAB400;
  margin-bottom: 19px;
  margin-left: 70px;
}

.scroll-container {
  max-height: 563px; /* Altura máxima del área de productos */
  overflow-y: auto; /* Habilitar scroll vertical */
  padding-right: 16px; /* Espacio para la barra de scroll */
}
</style>
