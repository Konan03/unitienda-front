<template>
  <v-card outlined class="pa-4" style="border: 1px solid #797575">
    <v-row align="center" justify="space-between">
      <v-col cols="auto" class="d-flex align-center">
        <v-avatar color="#0F1F39" size="32" class="mr-2">
          <span class="white--text">2</span>
        </v-avatar>
        <span class="headline font-weight-bold" style="color: #0f1f39">Envío</span>
      </v-col>
      <v-col cols="auto">
        <v-icon color="#0F1F39">mdi-truck-check</v-icon>
      </v-col>
    </v-row>

    <!-- Condicional para verificar si el método de pago es "reserva" -->
    <v-row v-if="metodoPago === 'reserva'" justify="center" class="mt-4">
      <v-col cols="auto">
        <p style="color: #ff0000; text-align: center;">Dirección no aplica para reserva.</p>
      </v-col>
    </v-row>

    <!-- Mostrar dirección seleccionada si el método de pago no es "reserva" -->
    <v-row v-else align="center" justify="space-between">
      <v-col cols="auto">
        <div>{{ `${selectedAddress.calle} ${selectedAddress.barrio}` }}</div>
        <div>{{ selectedAddress.ciudad }}</div>
        <div>{{ selectedAddress.pais }}</div>
        <div>{{ selectedAddress.codigoPostal }}</div>
      </v-col>
      <v-col
        cols="auto"
        class="d-flex align-center justify-end"
        style="padding-left: 16px"
      >
        <div
          class="d-flex flex-column justify-center"
          style="border-left: 1px solid #000000; padding-left: 8px; height: 50px;"
        >
          <span class="font-weight-bold" style="color: #000000">$ 3.100</span>
        </div>
      </v-col>
    </v-row>

    <!-- Enlace para cambiar opciones de entrega si el método de pago no es "reserva" -->
    <v-row v-if="metodoPago !== 'reserva'" justify="center">
      <v-col cols="auto">
        <a href="#" @click.prevent="openModal" style="color: #264983; text-decoration: none">
          Cambiar opciones de entrega
        </a>
      </v-col>
    </v-row>

    <!-- Modal para cambiar opciones de entrega si el método de pago no es "reserva" -->
    <v-dialog v-if="metodoPago !== 'reserva'" v-model="dialog" max-width="1000px">
      <v-card rounded="xl">
        <v-card-title>
          <span class="headline">Cambiar Dirección de Envío</span>
        </v-card-title>

        <v-card-text style="max-height: 500px; overflow-y: auto;">
          <v-row>
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
                    <div>{{ `${address.calle} ${address.barrio}` }}</div>
                    <div>{{ address.ciudad }}</div>
                    <div>{{ address.pais }}</div>
                    <div>{{ address.codigoPostal }}</div>
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
  </v-card>
</template>

<script setup>
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue';
import { obtenerDireccionesPorUsuario } from '../../service/addresService.js';

const props = defineProps({
  metodoPago: {
    type: String,
    required: true,
  }
});

const emit = defineEmits(['update-direccion']);
const dialog = ref(false);
const selectedAddressIndex = ref(0);
const selectedAddress = ref({ calle: '', barrio: '', ciudad: '', pais: '', codigoPostal: '' });
const userAddresses = ref([]);

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
  selectedAddressIndex.value = index;
  selectedAddress.value = userAddresses.value[index];
};

// Función para guardar la dirección seleccionada y emitir el ID al componente padre
const saveNewAddress = () => {
  if (selectedAddressIndex.value !== null) {
    selectedAddress.value = userAddresses.value[selectedAddressIndex.value];
    emit('update-direccion', selectedAddress.value.id); // Emitimos el ID de la dirección seleccionada
  } else {
    console.log("No se ha seleccionado ninguna dirección");
  }
  closeModal(); // Cierra el modal después de seleccionar
};

// Función para obtener las direcciones del usuario
const fetchUserAddresses = async () => {
  try {
    const response = await obtenerDireccionesPorUsuario();
    userAddresses.value = response;
  } catch (error) {
    console.error('Error al obtener las direcciones del usuario:', error);
  }
};

// Emitir null si el método de pago es "reserva"
watch(
  () => props.metodoPago,
  (newVal) => {
    if (newVal === 'reserva') {
      emit('update-direccion', null); // Emitimos null si es "reserva"
    }
  },
  { immediate: true }
);

// Obtener las direcciones del usuario cuando el componente se monta
onMounted(() => {
  fetchUserAddresses().then(() => {
    if (userAddresses.value.length > 0) {
      selectedAddressIndex.value = 0;
      selectedAddress.value = userAddresses.value[0];
    }
  });
});
</script>

<style>
.headline {
  color: #fab400;
}

.selected-card {
  background-color: #0f1f39 !important;
  color: white;
}
</style>
