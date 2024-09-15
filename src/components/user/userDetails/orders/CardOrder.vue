<template>
  <v-card class="pa-4 mb-4 main-card">
    <v-row>
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12"> <strong>Total:</strong> $38.000 </v-col>
          <v-col cols="12">
            <strong>Fecha del pedido:</strong> 20 de octubre de 2024
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4" class="text-right">
        <v-row>
          <v-col cols="12">
            <strong>#1289238239</strong>
          </v-col>
          <v-col cols="12">
            <v-chip color="#6FF14B" class="ml-2 custom-chip"><span class="chip-text">Enviando pedido</span></v-chip>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-divider class="my-4"></v-divider>

    <v-row>
      <v-col cols="12" md="2"> </v-col>
      <v-col cols="12" md="6" class="d-flex align-items-center">
        <img
          src="/src/assets/img/image 3.png"
          alt="Termo Blanco"
          class="product-image mr-5"
        />
        <div>
          <p><strong>Termo Blanco 800Ml</strong></p>
          <p>Entrega hasta el 28/10/2024</p>
          <p>1 ud. $34.900</p>
        </div>
      </v-col>
      <v-col cols="12" md="4" class="text-right">
        <v-btn color="#486594" class="mb-2 border-btn">Pedir de nuevo</v-btn>
        <v-btn color="#FAB400" outlined class="white-text-btn" @click="openDialog"
          >ver detalles del pedido</v-btn
        >
      </v-col>
    </v-row>
  </v-card>

  <!-- Modal -->
  <v-dialog v-model="isDialogOpen" max-width="1000px">
    <v-card rounded="xl">
      <v-card-title>
        <span class="headline">Pedido #1289238239</span>
      </v-card-title>

      <v-card-text>
        <!-- Aquí puedes incluir más detalles del pedido -->
        <v-row>
          <v-col cols="12" md="4">
            <CardAddressInfo />
          </v-col>
          <v-col cols="12" md="4">
            <CardPaymentInfo />
          </v-col>
          <v-col cols="12" md="4">
            <CardSummaryInfo />
          </v-col>
        </v-row>
        <CardStateInfo />
        <CardOrdeInfo />
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
import CardAddressInfo from "./cardsInfo/CardAddressInfo.vue";
import CardPaymentInfo from "./cardsInfo/CardPaymentInfo.vue";
import CardSummaryInfo from "./cardsInfo/CardSummaryInfo.vue";
import CardStateInfo from "./cardsInfo/CardStateInfo.vue";
import CardOrdeInfo from "./cardsInfo/CardOrdeInfo.vue";

// Variable reactiva para controlar la visibilidad del modal
const isDialogOpen = ref(false);

// Función para abrir el modal
const openDialog = () => {
  isDialogOpen.value = true;
};

// Función para cerrar la tarjeta (simulada)
const closeCard = () => {
  isDialogOpen.value = false; // Cierra el modal
};
</script>

<style scoped>
.v-btn {
  min-width: 160px;
}

.main-card {
  border: 1px solid #979797;
}

.headline {
  color: #fab400;
}

.product-image {
  width: 50px; /* Ajusta el ancho */
  height: auto; /* Mantiene la proporción original de la imagen */
  margin-left: -180px;
}

.border-btn{
  border-radius: 10px;
}

.white-text-btn {
  color: white !important; /* Cambia el color del texto a blanco */
  border-color: white !important; /* Opcional: cambiar el color del borde */
  border-radius: 10px;
}

.custom-chip {
  background-color: #6FF14B !important; /* Color de fondo más fuerte */  
  border-radius: 10px;
}
.chip-text {
  color: white !important; /* Asegura que el texto sea blanco */
  font-weight: bold; /* Hace el texto más visible */
}
</style>
