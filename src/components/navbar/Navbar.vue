<template>
  <v-container>
    <v-app-bar :elevation="7" color="primary" dark>
      <v-row align="center" justify="space-between" class="w-100">
        <!-- Logo y título -->
        <v-col cols="auto" class="d-flex align-center">
          <img src="/src/assets/img/unibague 2.png" alt="Logo" class="logo" />
          <v-app-bar-title class="white--text ml-3"
            >Tienda<br />
            Universitaria</v-app-bar-title
          >
        </v-col>

        <!-- Barra de búsqueda centrada -->
        <v-col cols="auto" class="d-flex justify-center flex-grow-1">
          <v-text-field
            v-model="search"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            clearable
            hide-details
            single-line
            class="search-bar"
          ></v-text-field>
        </v-col>

        <!-- Login -->
        <v-col cols="auto" class="d-flex align-center">
          <v-icon color="yellow" icon="mdi-account"></v-icon>
          <v-btn class="ml-2 mr-4" @click="goToLogin"> Iniciar sesión / Registrar </v-btn>
          <v-btn icon class="mr-4" @click="goToCart">
            <v-icon color="yellow" icon="mdi-cart"></v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-app-bar class="colorBar2">
      <v-row align="center" justify="start" class="w-100 no-gutters">
        <v-app-bar-nav-icon
          class="logo no-margin"
          color="white"
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-btn class="no-margin" color="white" @click="goToHome">Inicio</v-btn>
        <v-btn class="no-margin" color="white" @click="goToUnibague">Unibagué</v-btn>
        <v-btn class="no-margin" color="white" @click="goToMap">Mapa</v-btn>
      </v-row>
    </v-app-bar>

    <!-- Menú lateral (Drawer) -->
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6" style="color:#264983 ;">Categorías</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>Libros</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>Termos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>Papelería</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>Ropa</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';  // Asegúrate de tener esta importación

const router = useRouter()
const drawer = ref(false);
const search = ref("");

const goToLogin = () => {
  router.push({name: 'Login'})
}

const goToCart = () => {
  console.log("Ir al carrito");
};

const goToMap = () => {
  router.push({name: 'Map'});
}

const goToHome = () => {
  router.push({name: 'Home'})
}

function goToUnibague() {
  window.open('https://www.unibague.edu.co/', '_blank');
}




</script>

<style scoped>

.no-gutters {
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.no-margin {
  margin: 0 !important;
  padding: 0 8px !important; /* Espaciado horizontal reducido */
}

.logo {
  max-width: 50px; /* Reducir tamaño de la imagen */
  margin-left: 20px; /* Separar la imagen del borde izquierdo */
}

.search-bar {
  width: 100%; /* Asegura que ocupe todo el espacio disponible */
  max-width: 600px; /* Mantiene un tamaño máximo adecuado */
}

.v-app-bar {
  background-color: #051024 !important; /* Color hexadecimal de la barra de navegación */
}

.colorBar2 {
  background-color: #0f1f39 !important; /* Color hexadecimal de la barra de navegación */
}

.v-app-bar-title {
  font-size: 18px;
  line-height: 1.2;
  margin: 0;
}

.v-icon.mr-4 {
  margin-right: 30px; /* Añade margen derecho para separar el icono del carrito */
}


</style>
