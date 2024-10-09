<template>
    <v-card class="pa-3 my-4 order-card">
      <v-row>
        <!-- Columna con el número de pedido -->
        <v-col cols="1" class="center-text">
          <strong>1</strong>
        </v-col>
  
        <!-- Columna de número de pedido -->
        <v-col cols="2" class="center-text">
          <v-row no-gutters>
            <v-col cols="12"><strong>Número de pedido</strong></v-col>
            <v-col cols="12">1289238239</v-col>
          </v-row>
        </v-col>
  
        <!-- Columna de nombre del cliente -->
        <v-col cols="2.5" class="center-text">
          <v-row no-gutters>
            <v-col cols="12"><strong>Nombre del cliente</strong></v-col>
            <v-col cols="12">Laura Sofía</v-col>
            <v-col cols="12">Rojas Rojas</v-col>
          </v-row>
        </v-col>
  
        <!-- Columna de carrito -->
        <v-col cols="1.5" class="center-text">
          <v-row no-gutters>
            <v-col cols="12"><strong>Carrito</strong></v-col>
            <v-col cols="12">
              <img src="/src/assets/img/image 3.png" alt="Producto" class="product-image" />
            </v-col>
          </v-row>
        </v-col>
  
        <!-- Columna del total -->
        <v-col cols="1" class="center-text">
          <v-row no-gutters>
            <v-col cols="12"><strong>Total</strong></v-col>
            <v-col cols="12">$ 38.000</v-col>
          </v-row>
        </v-col>
  
        <!-- Columna del estado del pedido -->
        <v-col cols="2" class="center-text">
          <v-row no-gutters>
            <v-col cols="12"><strong>Estado del pedido</strong></v-col>
            <v-col cols="12">Pedido aprobado</v-col>
          </v-row>
        </v-col>
  
        <!-- Columna de acciones -->
        <v-col cols="2" class="center-text">
          <a href="#" class="view-details" @click.prevent="openDialog">Ver detalles</a>
        </v-col>
      </v-row>
    </v-card>
  
    <!-- Modal detalles de pedido -->
    <v-dialog v-model="isDialogOpen" max-width="1000px">
      <v-card rounded="xl">
        <v-card-title>
          <span class="headline">Pedido #1289238239</span>
        </v-card-title>
  
        <v-card-text>
          <!-- Aquí puedes incluir más detalles del pedido -->
          <v-row>
            <v-col cols="12" md="4">
              <CardAddressInfoAdmin/>
            </v-col>
            <v-col cols="12" md="4">
              <CardPaymentInforAdmin/>
            </v-col>
            <v-col cols="12" md="4">
              <CardSummaryInfoAdmin />
            </v-col>
          </v-row>
          <CardStateInfoAdmin />
          <!-- Sección con scroll -->
          <v-row>
            <v-col cols="12">
              <div class="scroll-container">
                <CardOrderInfoAdmin class="ml-4" v-for="i in 6" :key="i" />
              </div>
            </v-col>
          </v-row>
        </v-card-text>
  
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeCard">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import CardAddressInfoAdmin from "./cardsInfoAdmin/CardAddressInfoAdmin.vue";
  import CardPaymentInforAdmin from "./cardsInfoAdmin/CardPaymentInforAdmin.vue";
  import CardSummaryInfoAdmin from "./cardsInfoAdmin/CardSummaryInfoAdmin.vue";
  import CardStateInfoAdmin from "./cardsInfoAdmin/CardStateInfoAdmin.vue";
  import CardOrderInfoAdmin from "./cardsInfoAdmin/CardOrderInfoAdmin.vue";
  
  // Variable reactiva para controlar la visibilidad del modal
  const isDialogOpen = ref(false);
  
  // Función para abrir el modal
  const openDialog = () => {
    isDialogOpen.value = true;
  };
  
  // Función para cerrar el modal
  const closeCard = () => {
    isDialogOpen.value = false;
  };
  </script>
  
  <style scoped>
  .headline {
    color: #fab400;
  }
  
  /* Estilo para el contenedor de scroll */
  .scroll-container {
    max-height: 300px; /* Ajusta la altura del área de scroll */
    overflow-y: auto;
    padding-right: 16px; /* Espacio para la barra de scroll */
    border: 2px solid #979797; /* Agrega un borde */
    border-radius: 4px;
  }
  
  .order-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff7f7; /* Color de fondo claro */
  }
  
  /* Clase para centrar el texto */
  .center-text {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  /* Imagen del producto */
  .product-image {
    width: 50px;
    height: auto;
  }
  
  /* Estilo para el enlace "Ver detalles" */
  .view-details {
    color: #486594;
    text-decoration: none;
  }
  
  .view-details:hover {
    text-decoration: underline;
  }
  </style>
  