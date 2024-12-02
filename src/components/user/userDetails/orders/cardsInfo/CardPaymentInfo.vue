<template>
  <v-card class="pa-3 card-address" max-width="400px">
    <v-card-title class="justify-space-between">
      <div color="#0F1F39">Forma de pago</div>
    </v-card-title>
    <v-card-text class="text-card">
      <v-icon size="25" class="mr-2">{{ getPaymentIcon(metodoPago) }}</v-icon> 
      {{ metodoPagoTexto }} {{ formatCurrency(monto) }}
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  metodoPago: {
    type: String,
    required: true,
    default: 'TARJETA',
  },
  monto: {
    type: Number,
    required: true,
    default: 0,
  },
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const getPaymentIcon = (metodo) => {
  switch (metodo) {
    case 'TARJETA':
      return 'mdi-credit-card';
    case 'GANA_GANA':
      return 'mdi-wallet';
    case 'RESERVA':
      return 'mdi-calendar';
    default:
      return 'mdi-credit-card';
  }
};

const metodoPagoTexto = props.metodoPago === 'GANA_GANA' ? 'Gana Gana' :
                        props.metodoPago === 'TARJETA' ? 'Tarjeta Bancaria' :
                        props.metodoPago === 'RESERVA' ? 'Reserva' : 'Método Desconocido';
</script>

<style scoped>
.headline {
  color: #fab400;
}
.card-address {
  margin-bottom: 10px;
  border: 2px solid #979797;
  max-width: 400px;
  height: 190px;
  margin-top: 12px;
  margin-left: 10px;
}

.text-card {
  color: #486594;
  margin-bottom: 75px;
}
</style>
