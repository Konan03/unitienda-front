<template>
    <v-card class="pa-3 card-address" max-width="1000px">
      <!-- Título del pedido, entrega y código de rastreo alineado a la derecha -->
      <v-card-title class="justify-space-between"> Pedido </v-card-title>
  
      <v-row>
        <!-- Columna para "Entrega hasta" alineada a la izquierda -->
        <v-col cols="6" class="d-flex align-center">
          <p class="subtitle mb-0">Entrega hasta el 26/10/2024</p>
        </v-col>
  
        <!-- Columna para "Código de rastreo" alineada a la derecha -->
        <v-col cols="6" class="d-flex align-center justify-end">
          <strong class="tracking-section  text-center">Código de rastreo: <br>278612670</strong>
        </v-col>
      </v-row>
  
      <!-- Tabla de detalles del pedido -->
      <v-card-text class="text-card">
        <v-row class="header-row">
          <v-col cols="3">
            <strong class="column-title">Producto</strong>
          </v-col>
          <v-col cols="3">
            <strong class="column-title">Precio</strong>
          </v-col>
          <v-col cols="3">
            <strong class="column-title">Cantidad</strong>
          </v-col>
          <v-col cols="3">
            <strong class="column-title">Subtotal</strong>
          </v-col>
        </v-row>
  
        <!-- Detalles del producto -->
        <v-row>
          <v-col cols="3" class="d-flex align-center">
            <img
              src="/src/assets/img/image 3.png"
              alt="Termo Blanco"
              class="product-image"
            />
            <div class="ml-2">Termo Blanco 800Ml</div>
          </v-col>
          <v-col cols="3" class="d-flex align-center">
            <div>$34.900</div>
          </v-col>
          <v-col cols="3" class="d-flex align-center">
            <div>1 ud.</div>
          </v-col>
          <v-col cols="3" class="d-flex align-center">
            <div>$34.900</div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup>
  // Aquí podrías añadir lógica o props si fuese necesario
  </script>
  
  <style scoped>
  /* Estilos para personalizar el card */
  .card-address {
    margin-bottom: 10px;
    border: 2px solid #979797;
  }
  
  .text-card {
    color: #486594;
  }
  
  .title-section {
    color: #0f1f39;
  }
  
  .subtitle {
    font-size: 18px;
    color: #0f1f39;
    margin-left: 15px;
  }
  
  .tracking-section {
    color: #0f1f39;
    margin-right: 20px;
  }
  
  .column-title {
    color: #fab400;
  }
  
  .product-image {
    max-width: 50px; /* Ajustar el tamaño de la imagen */
    margin-right: 10px;
  }
  
  .d-flex {
    display: flex;
    align-items: center;
  }
  
  .ml-2 {
    margin-left: 10px;
  }
  
  </style>
  