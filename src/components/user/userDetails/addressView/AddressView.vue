<template>
    <v-card class="mx-auto pa-5" max-width="600">
      <v-card-title class="yellow--text">Direcciones</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-card class="pa-4">
          <strong>Direccion 1:</strong>
          <p>Calle 45 #9A 11 Limonar, 5to sector, Casa primer piso, Ibagué, Tolima 730006</p>
          <v-btn text color="blue">
            Editar
            <v-icon right>mdi-pencil</v-icon>
          </v-btn>
        </v-card>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="blue">
          Añadir nueva dirección
          <v-icon right>mdi-plus-box</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .v-card {
    border: 1px solid #12223d;
  }
  </style>
  