<template>
  <v-container fluid>
    <v-row>
      <!-- Columna izquierda para el componente OptionDetails -->
      <v-col cols="3">
        <OptionDetailsAdmin @changeView="changeView" />
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
import { shallowRef } from "vue";
import OptionDetailsAdmin from '@/components/admin/OptionDetailsAdmin.vue';
import ProductsView from '@/components/admin/adminDetails/products/ProductsAdminView.vue'
import OrdersView from '@/components/admin/adminDetails/orders/OrdersAdminView.vue'
import UsersView from '@/components/admin/adminDetails/users/UserAdminView.vue'

const currentView = shallowRef(ProductsView);

const changeView = (view) => {
  if (view === 'ProductsView') {
    currentView.value = ProductsView;
  } else if (view === 'OrdersView') {
    currentView.value = OrdersView;
  } else if(view === 'UsersView'){
    currentView.value = UsersView;
  } 
};



</script>

<style></style>
