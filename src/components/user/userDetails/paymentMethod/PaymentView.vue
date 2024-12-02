<template>
  <h2 class="title">Métodos de pago</h2>
  <v-card class="mx-auto pa-5 main-card" max-width="1300">
    <v-container class="scroll-container" fluid>
      <v-row>
        <v-col
          v-for="(payment, index) in payments"
          :key="payment.id"
          cols="12"
          md="6"
          lg="4"
          xl="3"
          class="mb-4"
        >
          <CardPayment :payment="payment" @updated="loadUserCards" />
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions class="btn">
      <v-btn text color="#486594" @click="openAddDialog">
        Añadir método de pago
        <v-icon right size="30">mdi-plus</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>

  <!-- Modal para añadir método de pago -->
  <v-dialog v-model="isAddDialogOpen" max-width="600px">
    <v-card rounded="xl">
      <v-card-title class="headline"> Añadir Método de Pago</v-card-title>
      <v-card-subtitle color="#051024">Ingresar una tarjeta de débito o crédito</v-card-subtitle>

      <v-card-text>
        <v-form>
          <v-text-field
            v-model="newCard.numeroTarjeta"
            rounded="lg"
            label="Número de tarjeta"
            placeholder="2837 1282 1228 1929"
            outlined
            maxlength="20"
          >
            <template v-slot:prepend-inner>
              <img v-if="cardIcon" :src="cardIcon" alt="Card Icon" style="width: 30px; height: 30px; object-fit: contain; margin-right: 10px;" />
            </template>
          </v-text-field>
          <v-text-field
            v-model="newCard.nombreTitular"
            rounded="lg"
            label="Nombre del titular"
            placeholder="Laura Rojas"
            outlined
          ></v-text-field>

          <h4 color="#051024">Fecha de vencimiento</h4>
          <v-row>
            <v-col cols="6">
              <v-select
                :items="months"
                label="Mes"
                v-model="newCard.mesExpiracion"
                outlined
                rounded="lg"
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-select
                :items="years"
                label="Año"
                v-model="newCard.anoExpiracion"
                outlined
                rounded="lg"
              ></v-select>
            </v-col>
          </v-row>

          <v-radio-group v-model="newCard.tipoTarjeta" row>
            <v-radio label="Crédito" value="CREDITO"></v-radio>
            <v-radio label="Débito" value="DEBITO"></v-radio>
          </v-radio-group>

          <v-text-field
            v-model="newCard.cvv"
            rounded="lg"
            label="CVV"
            placeholder="478"
            outlined
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-text v-if="errorMessage" class="error-message" style="color: red;">{{ errorMessage }}</v-card-text>
      <v-card-actions>
        <v-btn text @click="isAddDialogOpen = false">Cerrar</v-btn>
        <v-btn color="#486594" @click="savePaymentMethod">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import CardPayment from "./CardPayment.vue";
import { obtenerTarjetasUsuario, guardarTarjeta } from "../../../../service/cardService.js";


const isAddDialogOpen = ref(false);
const payments = ref([]);

const newCard = ref({
  numeroTarjeta: "",
  nombreTitular: "",
  mesExpiracion: null,
  anoExpiracion: null,
  tipoTarjeta: "CREDITO", // valor por defecto
  cvv: ""
});

const errorMessage = ref("");

// Obtener el icono de tarjeta según el tipo


import visaIcon from '@/assets/visaIcon.png';
import mastercardIcon from '@/assets/mastercardIcon.png';

const cardIcon = computed(() => {
  if (newCard.value.numeroTarjeta.startsWith("4")) {
    return visaIcon;
  } else if (newCard.value.numeroTarjeta.startsWith("5")) {
    return mastercardIcon;
  } else {
    return '';
  }
});

// Meses y años para los selectores de fecha de vencimiento
const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 20 }, (_, i) => (currentYear + i).toString());

// Cargar las tarjetas del usuario al montar el componente
onMounted(async () => {
  await loadUserCards();
});

// Función para cargar las tarjetas del usuario
const loadUserCards = async () => {
  try {
    const response = await obtenerTarjetasUsuario();
    payments.value = response;
  } catch (error) {
    console.error("Error al cargar tarjetas:", error);
  }
};

// Función para abrir el modal para añadir una tarjeta
const openAddDialog = () => {
  isAddDialogOpen.value = true;
};

// Función para guardar el nuevo método de pago
const savePaymentMethod = async () => {
  if (!newCard.value.numeroTarjeta || !newCard.value.nombreTitular || !newCard.value.mesExpiracion || !newCard.value.anoExpiracion || !newCard.value.cvv) {
    errorMessage.value = 'Por favor, completa todos los campos antes de guardar.';
    return;
  }
  errorMessage.value = '';
  const tarjetaRequest = {
    numeroTarjeta: newCard.value.numeroTarjeta,
    nombreTitular: newCard.value.nombreTitular,
    fechaExpiracion: `${newCard.value.mesExpiracion}/${newCard.value.anoExpiracion}`,
    tipoTarjeta: newCard.value.tipoTarjeta
  };

  try {
    await guardarTarjeta(tarjetaRequest);
    await loadUserCards(); // Recargar tarjetas después de guardar
    isAddDialogOpen.value = false; // Cerrar el modal
    resetNewCardForm(); // Resetear el formulario de la tarjeta
  } catch (error) {
    console.error("Error al guardar tarjeta:", error);
  }
};

// Función para resetear el formulario de la tarjeta
const resetNewCardForm = () => {
  newCard.value = {
    numeroTarjeta: "",
    nombreTitular: "",
    mesExpiracion: null,
    anoExpiracion: null,
    tipoTarjeta: "CREDITO",
    cvv: ""
  };
};
</script>

<style scoped>
.headline { color: #fab400; }
.main-card {
  max-height: 609px;
  max-width: 1200px;
  overflow-y: auto;
  margin: 0 auto;
  padding: 20px;
  border: 2px solid #12223d;
  margin-right: 20px;
}
.title { font-size: 60px; color: #fab400; margin-bottom: 20px; margin-left: 70px; }
.btn { margin-top: 50px; margin-left: 1020px; }
</style>
