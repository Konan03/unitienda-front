<template>
  <v-card outlined class="pa-4" style="border: 1px solid #797575">
    <v-row align="center" justify="space-between">
      <!-- Ícono de número 2 y título -->
      <v-col cols="auto" class="d-flex align-center">
        <v-avatar color="#0F1F39" size="32" class="mr-2">
          <span class="white--text">2</span>
        </v-avatar>
        <span class="headline font-weight-bold" style="color: #0f1f39"
          >Envío</span
        >
      </v-col>

      <!-- Ícono de camión -->
      <v-col cols="auto">
        <v-icon color="#0F1F39">mdi-truck-check</v-icon>
      </v-col>
    </v-row>

   <!-- Dirección de envío y precio alineados -->
   <v-row align="center" justify="space-between">
      <v-col cols="auto">
        <div>Calle 45 #9A 11 Limonar 5to sector</div>
        <div>Casa primer piso</div>
        <div>Colombia</div>
        <div>Ibagué, Tolima 730006</div>
      </v-col>

      <!-- Precio alineado a la derecha con línea -->
      <v-col cols="auto" class="d-flex align-center justify-end" style="padding-left: 16px;">
        <div class="d-flex flex-column justify-center" style="border-left: 1px solid #000000; padding-left: 8px; height: 50px;">
          <span class="font-weight-bold" style="color: #000000;">$ 3.100</span>
        </div>
      </v-col>
    </v-row>

    <!-- Enlace centrado para cambiar opciones de entrega -->
    <v-row justify="center">
      <v-col cols="auto">
        <a href="#" style="color: #264983; text-decoration: none"
          >Cambiar opciones de entrega</a
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup></script>
