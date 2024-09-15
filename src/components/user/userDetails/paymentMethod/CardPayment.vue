<template>
  <v-card class="pa-4 main-card" max-width="600px">
    <v-row>
      <!-- Icono de la tarjeta (logotipo de Visa) -->
      <v-col cols="auto">
        <v-img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png"
          alt="Visa logo"
          max-width="50"
        ></v-img>
      </v-col>

      <!-- Información de la tarjeta -->
      <v-col>
        <div>Visa ****5678</div>
        <div>06/2026</div>
      </v-col>

      <!-- Botón de editar -->
      <v-col class="text-right" cols="auto">
        <v-card-actions class="btn">
          <v-btn text color="#486594" @click="openDialog">
            Editar
            <v-icon right size="25">mdi-pencil</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>

  <!-- Modal para editar la tarjeta -->
  <v-dialog v-model="isDialogOpen" max-width="600px">
    <v-card rounded="xl">
      <v-card-title class="headline">Editar metodo de pago</v-card-title>
      <v-card-subtitle color="#051024">Ingresar una tarjeta de debito o credito</v-card-subtitle>
      <v-card-text>
        <v-form>
          <v-text-field rounded="lg" label="Número de tarjeta" placeholder="2837 1282 1228 1929" outlined></v-text-field>
          <v-text-field rounded="lg" label="Nombre del titular" placeholder="Laura Rojas" outlined></v-text-field>

          <h4 color="#051024">Fecha de vencimiento</h4>
          <v-row>
            <v-col cols="6">
              <v-select
                :items="months"
                label="Mes"
                v-model="selectedMonth"
                outlined
                rounded="lg"
              ></v-select>
            </v-col>
            <v-col cols="6">
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
        <v-btn text @click="isDialogOpen = false">Cerrar</v-btn>
        <v-btn color="#486594" @click="saveCard">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

// Variables para el estado del modal
const isDialogOpen = ref(false);

// Meses y años para los selectores
const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 61 }, (_, i) => (currentYear - 30 + i).toString()); // De 30 años en el pasado a 30 años en el futuro


const selectedMonth = ref(null); // Mes seleccionado por defecto
const selectedYear = ref(null); // Año seleccionado por defecto

// Función para abrir el modal
const openDialog = () => {
  isDialogOpen.value = true;
};

// Función para guardar la tarjeta (simulada)
const saveCard = () => {
  console.log("Tarjeta guardada");
  isDialogOpen.value = false; // Cierra el modal
};
</script>

<style scoped>
.main-card {
  border: 1px solid #979797;
  border-radius: 8px;
}

.v-btn {
  padding: 0;
  font-size: 14px;
}

.headline{
    color: #fab400;
  }
</style>
