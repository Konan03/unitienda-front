<template>
  <!-- Se renderiza el v-card solo si isVisible es true -->
  <v-card v-if="isVisible" outlined class="pa-4" style="border: 1px solid #797575; max-width: 350px;">
    <v-row class="d-flex justify-space-between">
      <!-- Imagen del producto -->
      <v-col cols="auto">
        <v-img
          src="/src/assets/img/image 3.png"
          width="50"
          height="120"
          alt="Termo"
        ></v-img>
      </v-col>

      <!-- Descripción del producto -->
      <v-col class="d-flex flex-column justify-center">
        <span style="font-size: 1.5rem;">Termo</span>
        <!-- Talla u otra información (opcional) -->
      </v-col>

      <!-- Precio y eliminar -->
      <v-col cols="auto" class="d-flex flex-column align-center justify-center">
        <v-btn icon @click="removeItem" class="mb-2">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <span style="color: #264983; font-size: 1.5rem;">$ 34.900</span>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';

// Variable para controlar la visibilidad del card
const isVisible = ref(true);

// Función para eliminar el card
const removeItem = () => {
  isVisible.value = false; // Oculta el card
};
</script>
