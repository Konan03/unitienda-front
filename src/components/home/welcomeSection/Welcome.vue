<template>
    <v-container>
      <v-row class="align-center">
        <v-col cols="12" md="6">
          <v-img
            :width="800"
            aspect-ratio="16/9"
            cover
            src="\src\assets\img\image 6.png"
          ></v-img>
        </v-col>
  
        <v-col cols="12" md="6">
          <h1 class="welcome-title">¡Bienvenidos a la tienda universitaria!</h1>
          <p class="welcome-text">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>
          <v-btn class="see-more-btn"> Ver más </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
    // Script setup
  </script>
  
  <style scoped>
  .welcome-title {
    font-size: 24px;
    font-weight: bold;
    color: #ffca28; /* Color amarillo */
    text-align: center; /* Centrar el título */
  }
  
  .welcome-text {
    font-size: 16px;
    font-weight: 500;
    color: #2f2f2f; /* Color gris oscuro */
    margin-bottom: 20px;
  }
  
  .see-more-btn {
    background-color: #0F1F39 !important; /* Color azul oscuro */
    color: white !important;
    border-radius: 8px;
    font-weight: bold;
    font-size: 14px; /* Tamaño de texto más pequeño */
    padding: 8px 16px; /* Reducir padding */
    width: 150px; /* Ancho más pequeño */
    margin: 0 auto; /* Centrar el botón horizontalmente */
    display: block; /* Asegurar que se centre */
  }
  
  .see-more-btn:hover {
    background-color: #2c3e50 !important; /* Color ligeramente más claro para el hover */
  }
  </style>
  