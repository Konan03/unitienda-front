<template>
  <h2 class="title">Metodos de pago</h2>
  <v-card class="mx-auto pa-5 main-card" max-width="1300">
    <v-container class="scroll-container" fluid>
      <v-row>
        <v-col
          v-for="(payment, index) in payments"
          :key="index"
          ols="12"
          md="6"
          lg="4"
          xl="3"
          class="mb-4"
        >
          <CardPayment />
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions class="btn">
      <v-btn text color="#486594" @click="openAddDialog">
        Añadir metodo de pago
        <v-icon right size="30">mdi-plus</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>

  <!-- Modal para añadir método de pago -->
  <v-dialog v-model="isAddDialogOpen" max-width="600px">
    <v-card rounded="xl">
      <v-card-title class="headline">Añadir Método de Pago</v-card-title>
      <v-card-subtitle color="#051024">Ingresar una tarjeta de debito o credito</v-card-subtitle>

      <v-card-text>
        <v-form>
          <v-text-field rounded="lg" label="Número de tarjeta" placeholder="2837 1282 1228 1929" outlined></v-text-field>
          <v-text-field rounded="lg" label="Nombre del titular" placeholder="Laura Rojas" outlined></v-text-field>

          <h4 color="#051024">Fecha de vencimiento</h4>
          <v-row>
            <v-col cols="4">
              <v-select
                :items="months"
                label="Mes"
                v-model="selectedMonth"
                outlined
                rounded="lg"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                :items="years"
                label="Año"
                v-model="selectedYear"
                outlined
                rounded="lg"
              ></v-select>
            </v-col>
          </v-row>
          
          <v-text-field rounded="lg" label="CVV" placeholder="478" outlined></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="isAddDialogOpen = false">Cerrar</v-btn>
        <v-btn color="#486594" @click="savePaymentMethod">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import CardPayment from "./CardPayment.vue";

// Estado del modal para añadir método de pago
const isAddDialogOpen = ref(false);

const payments = [
{ id: 1, name: "123456" },
{ id: 2, name: "123456" },
{ id: 3, name: "123456" },
{ id: 4, name: "123456" },
{ id: 5, name: "123456" },
{ id: 6, name: "123456" },
{ id: 7, name: "123456" },
{ id: 8, name: "123456" },
{ id: 9, name: "123456" },
{ id: 10, name: "123456" },
{ id: 11, name: "123456" },
{ id: 12, name: "123456" },
{ id: 13, name: "123456" },
{ id: 14, name: "123456" },
{ id: 15, name: "123456" },
{ id: 16, name: "123456" },
{ id: 17, name: "123456" },
{ id: 18, name: "123456" },
{ id: 19, name: "123456" },
{ id: 20, name: "123456" },
{ id: 21, name: "123456" },
{ id: 22, name: "123456" },
{ id: 23, name: "123456" },

];
// Control para el formulario del modal (días, meses, años)
const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0")); // Meses del 01 al 12
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 61 }, (_, i) => (currentYear - 30 + i).toString()); // Años desde el pasado



// Función para abrir el modal
const openAddDialog = () => {
  isAddDialogOpen.value = true;
};

// Función para simular la acción de guardar el método de pago
const savePaymentMethod = () => {
  // Aquí puedes implementar la lógica para guardar el método de pago
  console.log("Método de pago guardado");
  isAddDialogOpen.value = false; // Cierra el modal después de guardar
};
</script>

<style scoped>
.headline {
  color: #fab400;
}
.main-card {
  max-height: 609px; /* Limita la altura máxima del card grande */
  max-width: 1200px; /* Limita el ancho máximo del card grande */
  overflow-y: auto; /* Habilita scroll si las tarjetas de direcciones exceden la altura */
  margin: 0 auto; /* Centra el card contenedor */
  padding: 20px;
  border: 2px solid #12223d;
  margin-right: 20px; /* Espacio entre tarjetas */
}

.scroll-container {
  overflow: visible; /* Para que las tarjetas dentro no se recorten */
}

.v-row {
  margin: 0; /* Elimina márgenes de fila */
}

.title {
  font-size: 60px;
  color: #fab400;
  margin-bottom: 20px;
  margin-left: 70px;
  margin-top: -2px;
}

.btn {
  margin-top: 50px;
  margin-left: 1020px;
}

.headline{
    color: #fab400;
  }
</style>
