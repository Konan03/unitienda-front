<template>
    <v-card class="pa-3 my-4 info-card">
      <v-row>
        <!-- Columna con el número -->
        <v-col cols="0.5" class="center-text">
          <strong>1</strong>
        </v-col>
  
        <!-- Columna de nombres -->
        <v-col cols="1.5" class="center-text">
          <v-row no-gutters>
            <v-col cols="12"><strong>Nombres</strong></v-col>
            <v-col cols="12">Laura Sofía</v-col>
          </v-row>
        </v-col>
  
        <!-- Columna de apellidos -->
        <v-col cols="1.5" class="center-text">
          <v-row no-gutters>
            <v-col cols="12"><strong>Apellidos</strong></v-col>
            <v-col cols="12">Rojas Rojas</v-col>
          </v-row>
        </v-col>
  
        <!-- Columna de teléfono -->
        <v-col cols="1.5" class="center-text">
          <v-row no-gutters>
            <v-col cols="12"><strong>Teléfono</strong></v-col>
            <v-col cols="12">3105982315</v-col>
          </v-row>
        </v-col>
  
        <!-- Columna de correo electrónico -->
        <v-col cols="2.5" class="center-text">
          <v-row no-gutters>
            <v-col cols="12"><strong>Correo electrónico</strong></v-col>
            <v-col cols="12" class="text-truncate">2220201026@estudiantesunibague.du.co</v-col>
          </v-row>
        </v-col>
  
        <!-- Columna de tipo de documento -->
        <v-col cols="1.5" class="center-text">
          <v-row no-gutters>
            <v-col cols="12"><strong>Tipo Documento</strong></v-col>
            <v-col cols="12">CC</v-col>
          </v-row>
        </v-col>
  
        <!-- Columna de número de documento -->
        <v-col cols="1.5" class="center-text">
          <v-row no-gutters>
            <v-col cols="12"><strong>No. documento</strong></v-col>
            <v-col cols="12">1005753607</v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </template>
  
  <script setup>
  // No es necesario ningún script adicional en este ejemplo
  </script>
  
  <style scoped>
  .info-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff7f7; /* Color de fondo claro */
  }
  
  /* Clase para centrar el texto */
  .center-text {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  /* Asegurar que el texto no se divida en varias líneas */
  .text-truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  </style>
  