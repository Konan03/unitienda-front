<template>
    <h2 class="text-profile">Clientes</h2>
    <v-card class="mx-auto pa-5" max-width="1300">
      <v-card-text class="scroll-container">
        <CardUserAdmin class="card-user" v-for="(product, index) in products" :key="index"/>
      </v-card-text>
      
    </v-card>
  </template>
  
  <script setup>
  import CardUserAdmin from './CardUserAdmin.vue';

  import { ref } from "vue";

// Simular un listado de productos
const products = ref([
  { name: "Producto 1" },
 
]);

  </script>
  
  <style scoped>
  .v-card {
    border: 2px solid #12223d;
    
  }

  .card-user{
    border: 1px solid #ddd;
  }

  .data{
    font-size: 25px;
    margin-bottom: 108.5px;
  }

  .text-profile{
    font-size: 60px;
    color: #FAB400;
    margin-bottom: 19px;
    margin-left: 70px
  }

  .scroll-container {
  max-height: 563px; /* Altura máxima del área de productos */
  overflow-y: auto; /* Habilitar scroll vertical */
  padding-right: 16px; /* Espacio para la barra de scroll */
}
  
  </style>
  