<template>
  <v-container class="image-container">
    <img
      src="/src/assets/img/carrusel ejemplo 1.png"
      class="full-width-image"
    />

    
    <Products/>
     <!-- Cuadrícula de productos -->
     <v-row>
      <v-col cols="12" md="3" v-for="n in 4" :key="n">
        <CardProduct />
      </v-col>
    </v-row>
    <Welcome/>
    <BenefitsBar/>
    <!-- <Footer/> -->

  </v-container>
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
.image-container {
  width: 100%;
  padding: 0 !important;
}

.full-width-image {
  width: 100%; /* Ocupa todo el ancho de la ventana */
  height: 100vh; /* Ocupa todo el alto de la ventana */
  object-fit: cover; /* Ajusta la imagen para que cubra todo el espacio sin distorsión */
  display: block;
  margin: 0;
  padding: 0;
}

</style>
