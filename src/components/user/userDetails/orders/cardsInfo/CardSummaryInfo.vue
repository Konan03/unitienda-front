<template>
    <v-card class="pa-3 card-address" max-width="400px">
      <v-card-title class="justify-space-between">
        <div color="#0F1F39">Resumen</div>
      </v-card-title>
      <v-card-text class="text-card">
        <strong>Subtotal:</strong> $ 34.900 <br>
        <strong>Costo envio:</strong> $ 3.100 <br>
        <strong>Total:</strong> $ 38.000
       
      </v-card-text>
    </v-card>
  </template>
  
  <script setup></script>
  
  <style scoped>
  /* Estilos adicionales si son necesarios */
  .headline {
    color: #fab400;
  }
  .card-address {
    margin-bottom: 10px;
    border: 2px solid #979797;
  }
  
  .text-card {
    color: #486594;
    margin-bottom: 41px;
  }
  
  .btn {
    margin-top: -20px;
    margin-left: 140px;
  }
  </style>
  