<template>
    <h2 class="text-profile">Perfil</h2>
    <v-card class="mx-auto pa-5" max-width="1300">
      <v-card-text>
        <v-row>
          <v-col cols="6" class="data">
            <strong>Nombre:</strong> Laura
          </v-col>
          <v-col cols="6" class="data">
            <strong>Apellido:</strong> Rojas
          </v-col>
          <v-col cols="6" class="data">
            <strong>Telefono:</strong> 3105982315
          </v-col>
          <v-col cols="6" class="data">
            <strong>Email:</strong> 2220201026@estudiantesunibague.edu.co
          </v-col>
          <v-col cols="6" class="data">
            <strong>Tipo de documento:</strong> CC
          </v-col>
          <v-col cols="6" class="data">
            <strong>No. de documento:</strong> 1234567890
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="#486594">
          Editar
          <v-icon right size="30">mdi-pencil</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .v-card {
    border: 2px solid #12223d;
    
  }

  .data{
    font-size: 25px;
    margin-bottom: 108px;
  }

  .text-profile{
    font-size: 60px;
    color: #FAB400;
    margin-bottom: 20px;
    margin-left: 70px
  }

  
  </style>
  