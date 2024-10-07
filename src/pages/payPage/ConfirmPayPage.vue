<template>
    <v-container class="d-flex flex-column align-center justify-center confirm-container">
      <!-- Ícono de confirmación, como un checkmark -->
      <v-row class="d-flex justify-center mb-4">
        <v-col cols="12" class="d-flex justify-center">
          <v-icon size="80" color="green">mdi-check-circle</v-icon>
        </v-col>
      </v-row>
  
      <!-- Título de confirmación -->
      <v-row class="d-flex justify-center mb-4">
        <v-col cols="12" class="d-flex justify-center">
          <h2 class="confirm-title">¡Pago realizado con éxito!</h2>
        </v-col>
      </v-row>
  
      <!-- Mensaje de confirmación -->
      <v-row class="d-flex justify-center mb-4">
        <v-col cols="12" md="8" class="d-flex justify-center text-center">
          <p class="confirm-message">
            Su pago ha sido procesado correctamente. Revise sus pedidos en su cuenta para asegurarse de que su compra aparezca.
          </p>
        </v-col>
      </v-row>
  
      <!-- Botón de volver a pedidos -->
      <v-row class="d-flex justify-center">
        <v-btn color="#051024" dark large @click="goToOrders">Ver mis pedidos</v-btn>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";
  const router = useRouter();
  function goToOrders() {
    router.push({ name: "UserDetails" });
  }
  </script>
  
  <style scoped>
  .confirm-container {
    min-height: 100vh; /* Para que ocupe toda la pantalla */
    padding-top: 20px;
  }
  
  .confirm-title {
    font-size: 2rem;
    font-weight: bold;
    color: #0f1f39; /* Azul oscuro */
  }
  
  .confirm-message {
    font-size: 1.25rem;
    color: #555;
    margin-top: 0;
    margin-bottom: 20px;
  }
  
  .v-icon {
    font-size: 80px;
  }
  </style>
  