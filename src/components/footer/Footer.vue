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
            <li>Libros</li>
            <li>Termos</li>
            <li>Papelería</li>
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
            <li>¿Quiénes somos?</li>
            <li>Preguntas frecuentes</li>
            <li>Medios de pago</li>
            <li>Unibague</li>
            <li>PQRS</li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
//
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

.footer-list li {
  font-size: 16px;
  margin-bottom: 8px;
}
</style>
