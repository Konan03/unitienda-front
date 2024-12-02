<template>
  <v-card class="pa-3 my-4 order-card">
    <v-row>
      <!-- Columna con el número de pedido -->
      <v-col cols="1" class="center-text">
        <strong>{{ index }}</strong>
      </v-col>

      <!-- Columna de número de pedido -->
      <v-col cols="2" class="center-text">
        <v-row no-gutters>
          <v-col cols="12"><strong>Número de pedido</strong></v-col>
          <v-col cols="12">{{ order.numeroPedido }}</v-col>
        </v-row>
      </v-col>

      <!-- Columna de nombre del cliente -->
      <v-col cols="2.5" class="center-text">
        <v-row no-gutters>
          <v-col cols="12"><strong>Nombre del cliente</strong></v-col>
           <v-col cols="12">{{ order.usuario.nombre }} {{ order.usuario.apellido }}</v-col>
        </v-row>
      </v-col>

      <!-- Columna del total -->
      <v-col cols="1" class="center-text">
        <v-row no-gutters>
          <v-col cols="12"><strong>Total</strong></v-col>
          <v-col cols="12">$ {{ order.total.toLocaleString('es-CO') }}</v-col>
        </v-row>
      </v-col>

      <!-- Columna del estado del pedido -->
      <v-col cols="2" class="center-text">
        <v-row no-gutters>
          <v-col cols="12"><strong>Estado del pedido</strong></v-col>
          <v-col cols="12">{{ order.estado }}</v-col>
        </v-row>
      </v-col>

      <!-- Columna de acciones -->
      <v-col cols="2" class="center-text">
        <a href="#" class="view-details" @click.prevent="openDialog">Ver detalles</a>
      </v-col>
    </v-row>

    <!-- Modal detalles de pedido -->
    <v-dialog v-model="isDialogOpen" max-width="1000px">
      <v-card rounded="xl">
        <v-card-title>
          <span class="headline">Pedido #{{ order.numeroPedido}}</span>
        </v-card-title>
        <v-card-text>
          <!-- Detalles adicionales del pedido -->
          <v-row>
             <CardAddressInfoAdmin :direccion="order.direccion" title="Dirección de Envío" />
            <CardPaymentInforAdmin :metodoPago="order.metodoPago" :monto="order.total" />
            <v-col cols="12" md="4"><CardSummaryInfoAdmin :subtotal="order.subtotal" :costoEnvio="order.costoEnvio" :total="order.total" /></v-col>
          </v-row>
          <CardStateInfoAdmin :ordenId="order.id" :estadoActual="order.estado" />
          <v-row>
            <v-col cols="12">
              <div class="scroll-container">
   <CardOrderInfoAdmin :order="order" />
  </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#486594" text @click="closeCard">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import CardAddressInfoAdmin from './cardsInfoAdmin/CardAddressInfoAdmin.vue';
import CardPaymentInforAdmin from './cardsInfoAdmin/CardPaymentInforAdmin.vue';
import CardSummaryInfoAdmin from './cardsInfoAdmin/CardSummaryInfoAdmin.vue';
import CardStateInfoAdmin from './cardsInfoAdmin/CardStateInfoAdmin.vue';
import CardOrderInfoAdmin from './cardsInfoAdmin/CardOrderInfoAdmin.vue';

// Recibir la prop order desde el componente hijo
const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
   index: {
    type: Number,
    required: true,
  },
});
console.log("Contenido de 'order' en CardOrderAdmin:", props.order);
console.log("Contenido de 'order.detalles' en CardOrderAdmin:", props.order.detalles);

const isDialogOpen = ref(false);

const openDialog = () => {
  isDialogOpen.value = true;
};

const closeCard = () => {
  isDialogOpen.value = false;
};
</script>

<style scoped>
.headline {
  color: #fab400;
}

.scroll-container {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 16px;
  border: 2px solid #979797;
  border-radius: 4px;
}

.order-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff7f7;
}

.center-text {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.product-image {
  width: 50px;
  height: auto;
}

.view-details {
  color: #486594;
  text-decoration: none;
}

.view-details:hover {
  text-decoration: underline;
}
</style>
