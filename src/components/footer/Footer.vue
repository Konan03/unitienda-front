<template>
  <v-footer class="footer">
    <v-container>
      <v-row>
        <!-- Logo y nombre -->
        <v-col class="d-flex align-center">
          <v-img src="/src/assets/img/unibague 2.png" max-width="100"></v-img>
          <div class="ml-4">
            <h2 class="footer-title">Tienda<br />Universitaria</h2>
          </div>
        </v-col>

        <!-- Sección Para ti -->
        <v-col>
          <h3 class="footer-subtitle">Para ti</h3>
          <ul class="footer-list">
            <li>Novedades</li>
            <li>Destacados</li>
            <li @click="goToRouteBooks()" class="li-pointer">Libros</li>
            <li @click="goToRouteThermos()" class="li-pointer">Termos</li>
            <li @click="goToRouteStationery()" class="li-pointer">Papelería</li>
          </ul>
        </v-col>

        <!-- Sección Atención al cliente -->
        <v-col>
          <h3 class="footer-subtitle">Atención al cliente</h3>
          <ul class="footer-list">
            <li>Horario: Lunes a Viernes</li>
            <li>8:00 am - 12:00 pm</li>
            <li>2:00 pm - 6:00 pm</li>
            <li>Escríbenos:</li>
            <li>tiendauniversitaria@unibague.edu.co</li>
          </ul>
        </v-col>

        <!-- Sección Enlaces de interés -->
        <v-col>
          <h3 class="footer-subtitle">Enlaces de interés</h3>
          <ul class="footer-list">
            <li class="li-pointer">¿Quiénes somos?</li>
            <li class="li-pointer">Preguntas frecuentes</li>
            <li class="li-pointer">Medios de pago</li>
            <li class="li-pointer">Unibague</li>
            <li>PQRS</li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goToRouteBooks() {
  router.push({ name: "Books" }).then(() => {
    window.scrollTo(0, 0) // Desplaza la página hacia arriba
  })
}

function goToRouteThermos() {
  router.push({ name: "Thermos" }).then(() => {
    window.scrollTo(0, 0) // Desplaza la página hacia arriba
  });
}

function goToRouteStationery() {
  router.push({ name: "Stationery" }).then(() => {
    window.scrollTo(0, 0) // Desplaza la página hacia arriba
  });
}
</script>

<style scoped>
.footer {
  background-color: #000000;
  color: #ffffff;
  padding: 20px 0;
  margin-top: auto;
}

.footer-title {
  font-size: 24px;
  font-weight: bold;
}

.footer-subtitle {
  color: #ffca28;
  font-size: 18px;
  font-weight: bold;
}

.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-list{
  font-size: 16px;
  margin-bottom: 8px;
  
}

.li-pointer{
  cursor: pointer;

}
</style>
