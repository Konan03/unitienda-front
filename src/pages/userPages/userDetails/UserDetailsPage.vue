<template  class="d-flex flex-column align-center justify-center">
  <v-container fluid>
    <v-row>
      <!-- Columna izquierda para el componente OptionDetails -->
      <v-col cols="3">
        <OptionDetails @changeView="changeView" />
      </v-col>

      <!-- Columna derecha para el contenido que cambiará -->
      <v-col cols="9">
        <!-- Aquí puedes agregar el componente que cambiará -->
        <component :is="currentView" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, shallowRef } from "vue";
import OptionDetails from "@/components/user/userDetails/OptionDetails.vue";
import ProfileView from "@/components/user/userDetails/profileView/ProfileView.vue";
import AddressView from "@/components/user/userDetails/addressView/AddressView.vue";
import PaymentView from "@/components/user/userDetails/paymentMethod/PaymentView.vue";
import OrderView from "@/components/user/userDetails/orders/OrderView.vue";

const currentView = shallowRef(ProfileView);
// Función para cambiar la vista
const changeView = (view) => {
  if (view === 'ProfileView') {
    currentView.value = ProfileView;
  } else if (view === 'AddressView') {
    currentView.value = AddressView;
  } else if(view === 'PaymentView'){
    currentView.value = PaymentView;
  } else if(view === 'OrderView'){
    currentView.value = OrderView;
  }
};
</script>

<style scoped>
/* Aquí puedes ajustar márgenes y paddings si es necesario */
.v-container {
  padding-left: 0px;
  padding-right: 0px;
}

.v-col {
  padding: 0; /* Elimina los márgenes predeterminados entre columnas */
}
</style>
