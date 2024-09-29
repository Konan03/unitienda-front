<template>
  <!-- Eliminamos el v-container para que no limite el tamaño -->
  <div class="banner-wrapper">
    <!-- Imagen ajustada para ocupar todo el ancho y altura -->
    <img
      src="/src/assets/img/carrusel ejemplo 1.png"
      class="banner-img"
    />
  </div>

  <!-- Productos destacados -->
  <Products/>

  <!-- Cuadrícula de productos -->
  <v-row>
    <v-col cols="12" md="3" v-for="n in 4" :key="n">
      <CardProduct />
    </v-col>
  </v-row>

  <!-- Sección de bienvenida -->
  <Welcome/>

  <!-- Barra de beneficios -->
  <BenefitsBar/>

  <!-- <Footer/> -->
   
</template>

<script setup>
import Footer from '@/components/footer/Footer.vue';
import Products from '@/components/home/products/Products.vue';
import BenefitsBar from '@/components/home/benefitsBar/BenefitsBar.vue';
import CardProduct from '@/components/home/cardProduct/CardProduct.vue';
import Welcome from '@/components/home/welcomeSection/Welcome.vue';

//
</script>

<style scoped>
/* Ajustamos la imagen para que ocupe todo el espacio disponible */
.banner-wrapper {
  width: 100%;
  height: 60vh;
  overflow: hidden;
  margin-top: -32px;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center; /* Centra la imagen para que se vea bien */
}
</style>
