<template>
  <v-card class="pa-3 card-address" max-width="100%" height="100%">
    <v-card-title class="justify-space-between">
      <div color="#0F1F39">{{ title }}</div>
    </v-card-title>
    <v-card-text class="text-card">
      {{ direccion.calle }}<br />
      {{ direccion.sector }}<br />
      {{ direccion.tipoVivienda }}<br />
      {{ direccion.pais }}<br />
      {{ direccion.ciudad }}, {{ direccion.region }} {{ direccion.codigoPostal }}
    </v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  direccion: {
    type: Object,
    required: true,
    default: () => ({
      calle: '',
      sector: '',
      tipoVivienda: '',
      pais: '',
      ciudad: '',
      region: '',
      codigoPostal: ''
    }),
  },
  title: {
    type: String,
    default: 'Dirección'
  }
});
</script>

<style scoped>
.card-address {
  margin-bottom: 10px;
  border: 2px solid #979797;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* Ajuste para la alineación vertical */
  margin-top: 12px; /* Ajusta según necesites para alinearlo */
}

.text-card {
  color: #486594;
}
</style>
