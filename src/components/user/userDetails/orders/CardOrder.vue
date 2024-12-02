<template>
  <v-card class="pa-4 mb-4 main-card">
    <v-row>
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12">
            <strong>Total:</strong> ${{ props.order.total || 'N/A' }}
          </v-col>
          <v-col cols="12">
            <strong>Fecha del pedido:</strong> {{ formatDate(props.order.fechaCreacion) || 'No disponible' }}
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4" class="text-right">
        <v-row>
          <v-col cols="12">
            <strong>#{{ props.order.numeroPedido || 'Sin ID' }}</strong>
          </v-col>
          <v-col cols="12">
            <v-chip :color="orderStateColor" class="ml-2 custom-chip">
              <span class="chip-text">{{ orderState }}</span>
            </v-chip>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-divider class="my-2"></v-divider>

    <!-- Mostrar detalles del primer producto y los botones alineados con él -->
    <v-row>
      <v-col cols="12" md="2" class="text-center">
        <img :src="getProductImage(props.order.detalles[0]?.producto?.imagenes)" alt="Imagen del producto" class="product-image" />
      </v-col>
      <v-col cols="12" md="6">
        <div>
          <p><strong>{{ props.order.detalles[0]?.producto?.nombre || 'Producto desconocido' }}</strong></p>
          <p>Entrega hasta el {{ formatDate(props.order.fechaMaximaEntrega) || 'No disponible' }}</p>
          <p>{{ props.order.detalles[0]?.cantidad || 1 }} ud. ${{ props.order.detalles[0]?.producto?.precio || 'N/A' }}</p>
        </div>
      </v-col>
      <v-col cols="12" md="4" class="text-right">
        <v-btn color="#FAB400" outlined class="white-text-btn" @click="openDialog">
          Ver detalles del pedido
        </v-btn>
        
        <!-- Botón de cancelar pedido -->
        <v-btn color="red darken-1" outlined class="white-text-btn cancel-btn" @click="openCancelDialog">
          Cancelar pedido
        </v-btn>
      </v-col>
    </v-row>

    <!-- Mostrar detalles de los productos restantes -->
    <v-row v-for="(detalle, index) in props.order.detalles.slice(1)" :key="index">
      <v-col cols="12" md="2" class="text-center">
        <img :src="getProductImage(detalle.producto?.imagenes)" alt="Imagen del producto" class="product-image" />
      </v-col>
      <v-col cols="12" md="10">
        <div>
          <p><strong>{{ detalle.producto?.nombre || 'Producto desconocido' }}</strong></p>
          <p>Entrega hasta el {{ formatDate(props.order.fechaMaximaEntrega) || 'No disponible' }}</p>
          <p>{{ detalle.cantidad || 1 }} ud. ${{ detalle.producto?.precio || 'N/A' }}</p>
        </div>
      </v-col>
    </v-row>

    <!-- Modal detalles de pedido -->
    <v-dialog v-model="isDialogOpen" max-width="1000px">
      <v-card rounded="xl">
        <v-card-title>
          <span class="headline">Pedido #{{ props.order.numeroPedido || 'Sin ID' }}</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <CardAddressInfo :direccion="order.direccion" title="Dirección de Envío" />
            <CardPaymentInfo :metodoPago="order.metodoPago" :monto="order.total"/>
            <v-col cols="12" md="4"><CardSummaryInfo :subtotal="order.subtotal" :costoEnvio="order.costoEnvio" :total="order.total"/></v-col>
          </v-row>
          <CardStateInfo :ordenId="order.id" :estadoActual="order.estado" />
          <v-row>
            <v-col cols="12">
              <div class="scroll-container">
                <CardOrdeInfo :order="order"/>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Diálogo de confirmación de cancelación -->
    <v-dialog v-model="isCancelDialogOpen" max-width="400px">
      <v-card>
        <v-card-title class="headline">Confirmación</v-card-title>
        <v-card-text>
          ¿Estás seguro de cancelar el pedido?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="confirmCancelOrder">Sí</v-btn>
          <v-btn color="blue darken-1" text @click="closeCancelDialog">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue';
import orderService from '@/service/orderService'; // Asegúrate de importar correctamente la ruta
import CardAddressInfo from './cardsInfo/CardAddressInfo.vue';
import CardPaymentInfo from './cardsInfo/CardPaymentInfo.vue';
import CardSummaryInfo from './cardsInfo/CardSummaryInfo.vue';
import CardStateInfo from './cardsInfo/CardStateInfo.vue';
import CardOrdeInfo from './cardsInfo/CardOrdeInfo.vue';

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const isDialogOpen = ref(false);
const isCancelDialogOpen = ref(false); // Control del diálogo de confirmación de cancelación

// Computed para reflejar el estado y el color del estado de forma reactiva
const orderState = computed(() => props.order.estado || 'Desconocido');
const orderStateColor = computed(() => (orderState.value === 'CANCELADO' ? 'red' : props.order.estadoColor || 'grey'));

const getProductImage = (imagenes) => {
  if (imagenes && Array.isArray(imagenes) && imagenes.length > 0) {
    return `http://localhost:8080/images/${imagenes[0]}`;
  }
  return '/src/assets/img/libro.png';
};

const openDialog = () => { isDialogOpen.value = true; };
const closeDialog = () => { isDialogOpen.value = false; };

// Funciones para abrir y cerrar el diálogo de cancelación
const openCancelDialog = () => { isCancelDialogOpen.value = true; };
const closeCancelDialog = () => { isCancelDialogOpen.value = false; };

// Función para cancelar la orden en el backend usando orderService
const cancelarOrden = async (ordenId) => {
  try {
    const response = await orderService.cancelarOrden(ordenId); // Llamada al servicio
    return response;
  } catch (error) {
    console.error(`Error al cancelar la orden con ID ${ordenId}:`, error);
    throw error;
  }
};

// Función para confirmar la cancelación
const confirmCancelOrder = async () => {
  try {
    await cancelarOrden(props.order.id);
    props.order.estado = 'CANCELADO'; // Actualizamos el estado a "CANCELADO"
    alert("El pedido ha sido cancelado exitosamente.");
    closeCancelDialog(); // Cierra el diálogo después de confirmar
  } catch (error) {
    alert("Hubo un error al cancelar el pedido. Por favor, intenta nuevamente.");
  }
};

const formatDate = (dateString) => {
  if (!dateString) return 'No disponible';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
.main-card {
  border: 1px solid #979797;
}

.headline {
  color: #fab400;
}

.product-image {
  width: 70px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.border-btn {
  border-radius: 10px;
  margin-bottom: 8px;
}

.white-text-btn {
  color: white !important;
  border-color: white !important;
  border-radius: 10px;
}

.custom-chip {
  background-color: #6ff14b !important;
  border-radius: 10px;
}

.chip-text {
  color: white !important;
  font-weight: bold;
}

.scroll-container {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 16px;
}

/* Estilo adicional para el botón de cancelar */
.cancel-btn {
  color: white !important;
  border-color: red !important;
  margin-top: 10px;
}
</style>
