<template>
  <v-app>
    <v-main>
      <Navbar />
      <router-view />
      
    </v-main>
  </v-app>
</template>

<script setup>
import Footer from "./components/footer/Footer.vue";
import Navbar from "./components/navbar/Navbar.vue";

</script>
