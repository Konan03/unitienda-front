<template>
    <v-container>
      <!-- Barra de características (iconos) -->
      <div class="features-bar">
        <v-container fluid>
          <v-row no-gutters>
            <v-col class="d-flex justify-center align-center feature-item" cols="4">
              <v-icon style="font-size: 60px;">mdi-store</v-icon>
              <span class="feature-text">Pagos seguros</span>
            </v-col>
            <v-col class="d-flex justify-center align-center feature-item" cols="4">
              <v-icon style="font-size: 60px;">mdi-check-circle</v-icon>
              <span class="feature-text">Productos 100% originales</span>
            </v-col>
            <v-col class="d-flex justify-center align-center" cols="4">
              <v-icon style="font-size: 60px;">mdi-credit-card</v-icon>
              <span class="feature-text">Múltiples medios de pago</span>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-container>
  </template>
  
  <script setup>
    //
  </script>
  
  <style scoped>
  .features-bar {
    width: 100vw; 
    background-color: #32486C; 
    color: white; 
    padding: 10px 0; 
    margin-left: calc(-50vw + 50%);
    margin-top: 70px;
  }
  
  .feature-item {
    position: relative;
  }
  
  .feature-item:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    height: 140%; /* Aumentar el tamaño del separador */
    top: -15%; /* Centramos el separador verticalmente */
    border-right: 1px solid #ffffff;
  }
  
  .feature-text {
    margin-left: 10px; 
    font-size: 30px; 
  }
  </style>
  