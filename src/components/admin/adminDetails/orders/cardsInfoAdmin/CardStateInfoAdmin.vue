<template>
  <v-card class="pa-3 card-address" max-width="1000px">
    <v-card-title class="justify-space-between">
      <div color="#0F1F39">Estado del pedido</div>
    </v-card-title>
    <v-card-text class="text-card">
      <!-- Condición para mostrar mensaje si el estado es "CANCELADO" -->
      <template v-if="isCancelled">
        <p class="cancelled-message">Se ha cancelado este pedido</p>
      </template>
      <template v-else>
        <v-stepper alt-labels v-model="currentStep">
          <v-stepper-header>
            <!-- Paso 1: Pedido Confirmado -->
            <v-stepper-item
              title="Pedido Confirmado"
              value="1"
              :color="currentStep >= 1 ? 'success' : 'grey'"
              :complete="currentStep >= 1"
              :active="currentStep === 1"
            ></v-stepper-item>

            <v-divider></v-divider>

            <!-- Paso 2: Pedido Aprobado -->
            <v-stepper-item
              title="Pedido Aprobado"
              value="2"
              :color="currentStep >= 2 ? 'success' : 'grey'"
              :complete="currentStep >= 2"
              :active="currentStep === 2"
            ></v-stepper-item>

            <v-divider></v-divider>

            <!-- Paso 3: Pedido Preparado -->
            <v-stepper-item
              title="Pedido Preparado"
              value="3"
              :color="currentStep >= 3 ? 'success' : 'grey'"
              :complete="currentStep >= 3"
              :active="currentStep === 3"
            ></v-stepper-item>

            <v-divider></v-divider>

            <!-- Paso 4: Pedido Enviado -->
            <v-stepper-item
              title="Pedido Enviado"
              value="4"
              :color="currentStep >= 4 ? 'success' : 'grey'"
              :complete="currentStep >= 4"
              :active="currentStep === 4"
            ></v-stepper-item>

            <v-divider></v-divider>

            <!-- Paso 5: Pedido Entregado -->
            <v-stepper-item
              title="Pedido Entregado"
              value="5"
              :color="currentStep >= 5 ? 'success' : 'grey'"
              :complete="currentStep >= 5"
              :active="currentStep === 5"
            ></v-stepper-item>
          </v-stepper-header>
        </v-stepper>

        <!-- Botón para actualizar al siguiente estado -->
        <v-btn 
          color="primary" 
          class="advance-button" 
          @click="actualizarEstado" 
          :disabled="currentStep === 5">
          Avanzar Estado
        </v-btn>
      </template>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue';
import orderService from '@/service/orderService';

const props = defineProps({
  estadoActual: {
    type: String,
    required: true,
    default: 'CONFIRMADO',
  },
  ordenId: {
    type: Number,
    required: true,
  },
});

const estadoMap = {
  CONFIRMADO: 1,
  APROBADO: 2,
  PREPARADO: 3,
  ENVIADO: 4,
  ENTREGADO: 5,
};

// Computed para determinar si el estado es "CANCELADO"
const isCancelled = computed(() => props.estadoActual === 'CANCELADO');

// Estado actual en el stepper basado en el estado recibido
const currentStep = ref(estadoMap[props.estadoActual] || 1);

// Función para actualizar el estado de la orden
const actualizarEstado = async () => {
  try {
    const nuevoEstado = obtenerNuevoEstado(currentStep.value);
    if (!nuevoEstado) return;

    // Llamada al servicio para actualizar el estado de la orden
    const response = await orderService.actualizarEstadoOrden(props.ordenId, nuevoEstado);

    // Actualizar visualmente el estado en el componente
    currentStep.value = estadoMap[nuevoEstado];
    console.log("Estado actualizado:", response);
  } catch (error) {
    console.error("Error al actualizar el estado de la orden:", error);
  }
};

// Función para obtener el siguiente estado
const obtenerNuevoEstado = (current) => {
  const estados = Object.keys(estadoMap);
  const index = current - 1;
  return estados[index + 1] || null;
};
</script>

<style scoped>
.headline {
  color: #fab400;
}

.card-address {
  margin-bottom: 10px;
  border: 2px solid #979797;
}

.text-card {
  color: #486594;
  margin-bottom: 20px;
}

/* Estilo para el mensaje de pedido cancelado */
.cancelled-message {
  color: red;
  font-weight: bold;
  text-align: center;
}

/* Estilo para el botón de avance */
.advance-button {
  margin-top: 20px; /* Espacio extra debajo del stepper */
}
</style>
