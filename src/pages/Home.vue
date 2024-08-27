<template>
  <v-container class="image-container">
    <img
      src="/src/assets/img/carrusel ejemplo 1.png"
      class="full-width-image"
    />

    <v-row>
      <v-col cols="auto">
        <p class="section-title">Nuestros productos</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn class="custom-btn" outlined>Destacados</v-btn>
        <v-btn class="custom-btn" outlined>Nuevos</v-btn>
      </v-col>
    </v-row>

    <CardProduct/>
    <Welcome/>
    <BenefitsBar/>
    <Footer/>

  </v-container>
</template>

<script setup>
import Footer from '@/components/footer/Footer.vue';
import BenefitsBar from '@/components/home/benefitsBar/BenefitsBar.vue';
import CardProduct from '@/components/home/cardProduct/CardProduct.vue';
import Welcome from '@/components/home/welcomeSection/Welcome.vue';

//
</script>

<style scoped>
.image-container {
  width: 100%;
  padding: 0; /* Asegura que no haya relleno extra en el contenedor */
}

.full-width-image {
  width: 100%; /* La imagen tomará todo el ancho del contenedor */
  height: auto; /* La altura se ajustará proporcionalmente */
  display: block; /* Asegura que la imagen no se comporte como un inline element */
}

.section-title {
  font-size: 1.8rem; /* Aumenta el tamaño del texto */
  font-weight: bold;
  margin-top: 20px;
}

.custom-btn {
  background-color: #4a6fa5;
  color: white;
  border-radius: 12px;
  text-transform: none; /* Espacio entre los botones */
  margin-right: 10px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
