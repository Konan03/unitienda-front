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
      <v-col
        cols="auto"
        class="d-flex align-center justify-end"
        style="padding-left: 16px"
      >
        <div
          class="d-flex flex-column justify-center"
          style="
            border-left: 1px solid #000000;
            padding-left: 8px;
            height: 50px;
          "
        >
          <span class="font-weight-bold" style="color: #000000">$ 3.100</span>
        </div>
      </v-col>
    </v-row>

    <!-- Enlace centrado para cambiar opciones de entrega -->
    <v-row justify="center">
      <v-col cols="auto">
        <a href="#" @click.prevent="openModal" style="color: #264983; text-decoration: none">
          Cambiar opciones de entrega
        </a>
      </v-col>
    </v-row>
  </v-card>

  
  <!-- Modal para cambiar opciones de entrega -->
  <v-dialog v-model="dialog" max-width="1000px">
    <v-card rounded="xl">
      <v-card-title>
        <span class="headline">Cambiar Dirección de Envío</span>
      </v-card-title>

      <!-- Contenedor con scroll para direcciones -->
      <v-card-text style="max-height: 500px; overflow-y: auto;">
        <v-row>
          <!-- Renderizar las direcciones del usuario en dos columnas -->
          <v-col
            cols="12"
            md="6"
            v-for="(address, index) in userAddresses"
            :key="index"
            @click="selectAddress(index)"  
          >
            <v-card
              :class="{'selected-card': selectedAddressIndex === index}"  
              outlined
              class="pa-4"
            >
              <v-row>
                <v-col cols="12">
                  <h3>Dirección {{ index + 1 }}</h3>
                  <div>{{ address.street }}</div>
                  <div>{{ address.city }}</div>
                  <div>{{ address.country }}</div>
                  <div>{{ address.zip }}</div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="closeModal">Cancelar</v-btn>
        <v-btn color="#486594" @click="saveNewAddress">Seleccionar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>


import { ref } from 'vue';

// Estado reactivo para controlar la visibilidad del modal
const dialog = ref(false);

// Estado para almacenar la dirección seleccionada
const selectedAddressIndex = ref(null);  // Aquí se almacena el índice de la dirección seleccionada

// Función para abrir el modal
const openModal = () => {
  dialog.value = true;
};

// Función para cerrar el modal
const closeModal = () => {
  dialog.value = false;
};

// Función para seleccionar una dirección
const selectAddress = (index) => {
  selectedAddressIndex.value = index;  // Solo permite seleccionar una dirección a la vez
};

// Simular lista de direcciones del usuario
const userAddresses = ref([
  { street: "Calle 45 #9A 11 Limonar 5to sector", city: "Ibagué", country: "Colombia", zip: "730006" },
  { street: "Carrera 12 #45-67", city: "Bogotá", country: "Colombia", zip: "110111" },
  { street: "Calle 23 #45B 12", city: "Cali", country: "Colombia", zip: "760011" },
  { street: "Calle 23 #45B 12", city: "Cali", country: "Colombia", zip: "760011" },
  { street: "Calle 23 #45B 12", city: "Cali", country: "Colombia", zip: "760011" },
  
  // Agrega más direcciones si es necesario...
]);

// Función para guardar la dirección seleccionada (puedes personalizar esto)
const saveNewAddress = () => {
  if (selectedAddressIndex.value !== null) {
    const selectedAddress = userAddresses.value[selectedAddressIndex.value];
    console.log("Dirección seleccionada:", selectedAddress);
  } else {
    console.log("No se ha seleccionado ninguna dirección");
  }
  closeModal(); // Cierra el modal después de seleccionar
};

</script>

<style>
.headline {
  color: #fab400;
}

.selected-card {
  background-color: #0f1f39 !important;
  color: white; /* Cambia el color de fondo cuando está seleccionada */
}
</style>
