<template>
  <v-card class="pa-3 card-address" max-width="400px">
    <v-card-title class="justify-space-between">
      <div color="#0F1F39">Resumen</div>
    </v-card-title>
    <v-card-text class="text-card">
      <strong>Subtotal:</strong> {{ formatCurrency(subtotal) }} <br>
      <strong>Costo envío:</strong> {{ formatCurrency(costoEnvio) }} <br>
      <strong>Total:</strong> {{ formatCurrency(total) }}
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue';

// Definir props para recibir los valores de subtotal, costo de envío y total
const props = defineProps({
  subtotal: {
    type: Number,
    required: true,
    default: 0,
  },
  costoEnvio: {
    type: Number,
    required: true,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
});

// Función para formatear el monto en pesos colombianos
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
.headline {
  color: #fab400;
}
.card-address {
  margin-bottom: 10px;
  border: 2px solid #979797;
  max-width: 400px;
  height: 190px; /* Altura fija para igualar el tamaño de los otros componentes */
}

.text-card {
  color: #486594;
  margin-bottom: 41px;
}
</style>
