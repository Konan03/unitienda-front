<template>
  <v-card outlined class="pa-4" style="border: 1px solid #797575;">
    <v-row align="center" justify="space-between">
      <!-- Ícono de número 3 y título -->
      <v-col cols="auto" class="d-flex align-center">
        <v-avatar color="#0F1F39" size="32" class="mr-2">
          <span class="white--text">3</span>
        </v-avatar>
        <span class="headline font-weight-bold" style="color: #0F1F39;">Pago</span>
      </v-col>
    </v-row>

    <!-- Opciones de pago -->
    <v-row class="mt-4">
      <!-- Opciones de pago (Izquierda) -->
      <v-col cols="6">
        <!-- Botón de Tarjeta de débito -->
        <v-btn outlined class="mb-2 d-flex justify-space-between " style="width: 100%; min-width: 300px;">
          <span >Tarjeta de débito</span>
          <div class="d-flex">
            <v-img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" width="30" height="20" class="mr-2"></v-img>
            <v-img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" width="30" height="20"></v-img>
          </div>
        </v-btn>

        <!-- Botón de Tarjeta de crédito -->
        <v-btn outlined class="mb-2 d-flex justify-space-between" style="width: 100%; min-width: 300px;">
          <span>Tarjeta de crédito</span>
          <div class="d-flex">
            <v-img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" width="30" height="20" class="mr-2"></v-img>
            <v-img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" width="30" height="20"></v-img>
          </div>
        </v-btn>

        <!-- Botón PSE -->
        <v-btn outlined class="mb-2 d-flex justify-space-between" style="width: 100%; min-width: 300px;">
          <span>PSE</span>
          <v-img src="/src/assets/img/pse.png" width="30" height="30"></v-img>
        </v-btn>

        <!-- Botón Gana Gana -->
        <v-btn outlined class="d-flex justify-space-between" style="width: 100%; min-width: 300px;">
          <span>Gana Gana</span>
          <v-img src="/src/assets/img/ganagana.png" width="30" height="30"></v-img>
        </v-btn>
      </v-col>

      <!-- Detalles de la tarjeta seleccionada (Derecha) -->
      <v-col cols="6">
        <v-btn outlined class="mb-2 d-flex justify-space-between" style="width: 100%; min-width: 300px;">
          <div class="d-flex align-center">
            <v-img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" width="30" height="20" class="mr-2"></v-img>
            <div>
              <div>Visa ****5678</div>
              <div>06/2026</div>
            </div>
          </div>
          <v-radio v-model="selectedPayment" value="visa"></v-radio>
        </v-btn>

        <!-- Botón Agregar tarjeta -->
        <v-btn outlined class="d-flex justify-space-between" style="width: 100%; min-width: 300px;" @click="openAddDialog">
          <div class="d-flex align-center">
            <v-icon left>mdi-credit-card-plus-outline</v-icon>
            <span>Agregar tarjeta</span>
          </div>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>

  <!-- Modal para añadir método de pago -->
  <v-dialog v-model="isAddDialogOpen" max-width="600px">
    <v-card rounded="xl">
      <v-card-title class="headline">Añadir Método de Pago</v-card-title>
      <v-card-subtitle color="#051024">Ingresar una tarjeta de debito o credito</v-card-subtitle>

      <v-card-text>
        <v-form>
          <v-text-field rounded="lg" label="Número de tarjeta" placeholder="xxx xxxx xxx" outlined></v-text-field>
          <v-text-field rounded="lg" label="Nombre del titular" placeholder="abcd efghi" outlined></v-text-field>

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
          
          <v-text-field rounded="lg" label="CVV" placeholder="xxx" outlined></v-text-field>
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
import { ref } from 'vue';

const selectedPayment = ref(null);
// Estado del modal para añadir método de pago
const isAddDialogOpen = ref(false);

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

<style>
.border-btn{
  border: 1px solid #797575;
  }
  .headline {
  color: #fab400;
}
  
</style>
