<template>
    <v-container class="d-flex justify-center">
      <v-card
        class="mx-auto my-5 border-shadow"
        outlined
        elevation="5"
        max-width="2000px"
      >
        <v-card-title>
          <h2 class="text-center">Mapa Unibague</h2>
        </v-card-title>
        <v-card-text class="d-flex justify-center">
          <v-img
            src="/src/assets/img/image 35.png"
            width="1000px" 
            height="600px" 
            class="zoom-on-hover "
          ></v-img>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .border-shadow {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Sombreado */
    border-radius: 25px;
  }
  
  
  /* Efecto de zoom */
  .zoom-on-hover {
    transition: transform 0.3s ease; /* Suavizado del zoom */
  }
  
  .zoom-on-hover:hover {
    transform: scale(1.5); /* Aumenta el tamaño de la imagen al pasar el cursor */
  }
  </style>
  