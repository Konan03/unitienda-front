<template>
  <v-card class="pa-3 card-address" max-width="1000px">
    <v-card-title class="justify-space-between">
      <div color="#0F1F39">Estado del pedido</div>
    </v-card-title>
    <v-card-text class="text-card">
      <!-- Condición para mostrar mensaje si el estado es "CANCELADO" -->
      <template v-if="isCancelled">
        <p class="cancelled-message">Has cancelado este pedido</p>
      </template>
      <template v-else>
        <v-stepper alt-labels v-model="currentStep">
          <v-stepper-header>
            <!-- Paso 1: Pedido Confirmado -->
            <v-stepper-item
              title="Pedido Confirmado"
              value="1"
              :complete="currentStep >= 1"
              :active="currentStep === 1"
              :color="currentStep >= 1 ? 'green' : 'grey'"
            ></v-stepper-item>

            <v-divider></v-divider>

            <!-- Paso 2: Pedido Aprobado -->
            <v-stepper-item
              title="Pedido Aprobado"
              value="2"
              :complete="currentStep >= 2"
              :active="currentStep === 2"
              :color="currentStep >= 2 ? 'green' : 'grey'"
            ></v-stepper-item>

            <v-divider></v-divider>

            <!-- Paso 3: Pedido Preparado -->
            <v-stepper-item
              title="Pedido Preparado"
              value="3"
              :complete="currentStep >= 3"
              :active="currentStep === 3"
              :color="currentStep >= 3 ? 'green' : 'grey'"
            ></v-stepper-item>

            <v-divider></v-divider>

            <!-- Paso 4: Pedido Enviado -->
            <v-stepper-item
              title="Pedido Enviado"
              value="4"
              :complete="currentStep >= 4"
              :active="currentStep === 4"
              :color="currentStep >= 4 ? 'green' : 'grey'"
            ></v-stepper-item>

            <v-divider></v-divider>

            <!-- Paso 5: Pedido Entregado -->
            <v-stepper-item
              title="Pedido Entregado"
              value="5"
              :complete="currentStep >= 5"
              :active="currentStep === 5"
              :color="currentStep >= 5 ? 'green' : 'grey'"
            ></v-stepper-item>
          </v-stepper-header>
        </v-stepper>
      </template>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps, computed, onMounted } from 'vue';

// Props para recibir el estado actual del pedido
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

// Mapa de estados a valores numéricos para controlar los pasos, incluyendo "PENDIENTE"
const estadoMap = {
  PENDIENTE: 0,
  CONFIRMADO: 1,
  APROBADO: 2,
  PREPARADO: 3,
  ENVIADO: 4,
  ENTREGADO: 5,
};

// Computed para determinar si el estado es "CANCELADO"
const isCancelled = computed(() => props.estadoActual === 'CANCELADO');

// Computed property para obtener el paso actual basado en el estado
const currentStep = computed(() => estadoMap[props.estadoActual] || 0);

onMounted(() => {
  console.log("Estado actual recibido:", props.estadoActual); // Verificar el estado actual en consola
  console.log("Paso actual calculado (currentStep):", currentStep.value); // Verificar el paso calculado
});
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

/* Estilos para bolitas completadas y activas */
.v-stepper__step--complete .v-stepper__step__step,
.v-stepper__step--active .v-stepper__step__step {
  background-color: #6ff14b !important; /* Fondo verde para bolitas completadas o activas */
  color: white !important; /* Color de texto blanco */
}

.v-stepper__step--complete .v-icon,
.v-stepper__step--active .v-icon {
  color: white !important; /* Ícono blanco para que se vea en fondo verde */
}

/* Estilos para bolitas en gris */
.v-stepper__step__step {
  background-color: grey;
  color: white !important;
}

/* Estilo para el mensaje de pedido cancelado */
.cancelled-message {
  color: red;
  font-weight: bold;
  text-align: center;
}
</style>
