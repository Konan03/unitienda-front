<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
        <p class="section-title">Nuestros productos</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn class="custom-btn" outlined>Destacados</v-btn>
        <v-btn class="custom-btn" outlined>Nuevos</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup></script>

<style>
.section-title {
  font-size: 1.8rem; /* Aumenta el tamaño del texto */
  font-weight: bold;
  margin-top: 20px;
}

.custom-btn {
  background-color: #486594 !important;
  color: white !important;
  border-radius: 12px !important;
  text-transform: none; /* Espacio entre los botones */
  margin-right: 10px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
