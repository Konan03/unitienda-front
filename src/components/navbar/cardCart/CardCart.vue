<template>
    <v-card class="mb-4" outlined style="border: 1px solid black; padding: 16px;">
      <v-row class="d-flex justify-space-between align-center">
        <!-- Imagen del producto -->
        <v-img
          :src="productImage"
          width="80"
          height="80"
        ></v-img>
  
        <!-- Descripción del producto -->
        <div class="text-left" style="flex-grow: 1; margin-left: 16px;">
          <div><strong style="font-size: 18px;">{{ productName }}</strong></div>
          <div style="font-size: 16px;">Color: {{ productColor }}</div>
          <div style="font-size: 16px;">Tamaño: {{ productSize }}</div>
          <div class="font-weight-bold mt-2" style="font-size: 18px;">{{ formattedPrice }}</div>
        </div>
  
        <!-- Opciones de cantidad y eliminar -->
        <div class="d-flex flex-column align-center">
          <v-btn icon @click="emitRemoveItem" class="mb-2">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
  
          <v-select
            v-model="selectedQuantity"
            :items="[1, 2, 3, 4, 5]"
            dense
            hide-details
            style="width: 70px; font-size: 16px;"
          ></v-select>
        </div>
      </v-row>
    </v-card>
  </template>
  
  <script setup>
  import { ref, computed, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    productName: String,
    productColor: String,
    productSize: String,
    productPrice: Number,
    productImage: String,
  });
  
  const emit = defineEmits(['remove-item']);
  
  const selectedQuantity = ref(1);
  
  const formattedPrice = computed(() => `$${props.productPrice.toFixed(3)}`);
  
  const emitRemoveItem = () => {
    emit('remove-item');
  };
  </script>
  