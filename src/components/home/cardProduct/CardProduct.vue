<template>
  <v-container>
    <v-card
      :disabled="loading"
      :loading="loading"
      class="mx-auto my-12 custom-card"
      max-width="374"
    >
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img height="350" src="\src\assets\img\image 3.png" cover></v-img>

      <v-card-item>
        <v-card-title>Termo</v-card-title>
        <v-card-title>$ 34.900</v-card-title>
      </v-card-item>

      <v-divider class="mx-4 mb-1"></v-divider>

      <v-card-actions>
        <v-btn
          class="custom-btn"
          block
          border
        >
          Agregar al carrito
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
  //
</script>

<style scoped>
.custom-card {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2); /* Más sombra */
}

.custom-btn {
  background-color: #FAB400 !important; /* Color de fondo del botón */
  color: black !important; /* Color del texto */
}

.custom-btn:hover {
  background-color: #ffca28 !important; /* Color del botón al hacer hover */
}

</style>
