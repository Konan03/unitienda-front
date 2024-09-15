<template>
  <v-container>
    <v-card class="mx-auto profile-card" max-width="400">
      <v-card-title class="d-flex justify-center">
        <v-avatar size="100">
          <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
        </v-avatar>
      </v-card-title>
      <v-card-subtitle class="text-center color-name">
        Manuel Caicedo
      </v-card-subtitle>
      <v-divider class="custom-divider"></v-divider>
      <v-list>
        <v-list-item class="list-item" @click="changeTo('ProfileView')">
          <v-list-item-content>
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="list-item" @click="changeTo('AddressView')">
          <v-list-item-content>
            <v-list-item-title>Direcciones</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="list-item">
          <v-list-item-content>
            <v-list-item-title>Pedidos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="list-item" @click="changeTo('PaymentView')">
          <v-list-item-content>
            <v-list-item-title>Métodos de pago</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['changeView']);

// Función para emitir el evento y cambiar la vista
const changeTo = (view) => {
  emit('changeView', view);
};
</script>

<style scoped>
.color-name {
  color: black !important;
  font-size: 20px;
  margin-bottom: 20px;
}

.profile-card {
  height: 700px; /* Aumenta la altura de la tarjeta */
  border: 2px solid #0f1f39;
}

.custom-divider {
  border-color: #0f1f39 !important; /* Cambia el color del divider */
}

.list-item {
  margin-bottom: 20px; /* Aumenta el espacio entre los elementos de la lista */
}

.v-list-item-title {
  color: #12223d;
  font-size: 30px;
  margin-bottom: 20px;
}
</style>
