<template>
    <v-card outlined class="pa-4" style="border: 1px solid #32486C; max-width: 350px;">
      <v-row>
        <v-col cols="auto">
          <span>Subtotal</span>
        </v-col>
        <v-col class="text-right">
          <span>$ 34.900</span>
        </v-col>
      </v-row>
  
      <v-row>
        <v-col cols="auto">
          <span>Gastos de envío</span>
        </v-col>
        <v-col class="text-right">
          <span>$ 3.100</span>
        </v-col>
      </v-row>
  
      <v-row>
        <v-col cols="auto">
          <span class="font-weight-bold">Total</span>
        </v-col>
        <v-col class="text-right">
          <span class="font-weight-bold" style="color: #264983;">$ 38.000</span>
        </v-col>
      </v-row>
  
      <v-row class="mt-4">
        <v-col class="text-center">
          <v-btn color="#FAB400" dark rounded large @click="comprarAhora">
            Comprar ahora
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";
  const router = useRouter();
  function comprarAhora() {
    // Acción al hacer clic en el botón "Comprar ahora"
    router.push({ name: "ConfirmPayPage" });
  }
  </script>
  