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
            Descubre todo lo que necesitas para vivir al máximo la experiencia universitaria. 
            Desde el material académico hasta el mejor equipo para mostrar tu orgullo estudiantil. 
            Navega por una selección exclusiva de productos diseñados para acompañarte en cada paso de tu camino universitario.
            ¡Haz que tu espíritu de estudiante brille con todo lo que tenemos para ofrecer!
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
    text-align: center;
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
  