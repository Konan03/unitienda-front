<template>
  <v-app class="app">
    <v-main>
      <Navbar />
      <router-view />
    </v-main>
    <Footer class="footer"/>
  </v-app>
</template>

<script setup>
import Footer from "./components/footer/Footer.vue";
import Navbar from "./components/navbar/Navbar.vue";

</script>

<style>


.app{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>


