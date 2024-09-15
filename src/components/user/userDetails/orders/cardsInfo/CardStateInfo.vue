<template>
  <v-card class="pa-3 card-address" max-width="1000px">
    <v-card-title class="justify-space-between">
      <div color="#0F1F39">Estado del pedido</div>
    </v-card-title>
    <v-card-text class="text-card">
      <v-stepper alt-labels>
        <v-stepper-header>
          <v-stepper-item title="Pedido Confirmado" value="1" color="success"></v-stepper-item>

          <v-divider></v-divider>

          <v-stepper-item title="Pedido aprobado" value="2" color="success"></v-stepper-item>

          <v-divider></v-divider>

          <v-stepper-item title="Pedido preparado" value="3"></v-stepper-item>

          <v-divider></v-divider>

          <v-stepper-item title="Pedido enviado" value="3"></v-stepper-item>

          <v-divider></v-divider>

          <v-stepper-item title="Pedido entregado" value="3"></v-stepper-item>
        </v-stepper-header>
      </v-stepper>
    </v-card-text>
  </v-card>
</template>

<script setup></script>

<style scoped>
/* Estilos adicionales si son necesarios */
.headline {
  color: #fab400;
}
.card-address {
  margin-bottom: 10px;
  border: 2px solid #979797;
}

.text-card {
  color: #486594;
  margin-bottom: 20px;
}

.btn {
  margin-top: -20px;
  margin-left: 140px;
}
</style>
