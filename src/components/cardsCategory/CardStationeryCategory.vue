<template>
  <v-container>
    <v-card
      :disabled="loading"
      :loading="loading"
      class="mx-auto my-12 custom-card"
      max-width="374"
    >
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img height="350" src="\src\assets\img\papel.jpg" cover></v-img>

      <v-card-item>
        <v-card-title>Libro</v-card-title>
        <v-card-title>$ 34.900</v-card-title>
      </v-card-item>

      <!-- Nueva sección de selección de colores -->
      <v-card-item class="px-4 pb-4">
        <v-row>
          <v-col>
            <span>Colores disponibles:</span>
            <v-row>
              <v-col cols="auto">
                <v-chip
                  :class="['color-chip', { 'selected-chip': selectedColor === 'red' }]"
                  small
                  @click="selectColor('red')"
                  style="background-color: #FF1744;"  
                ></v-chip>
              </v-col>
              <v-col cols="auto">
                <v-chip
                  :class="['color-chip', { 'selected-chip': selectedColor === 'blue' }]"
                  small
                  @click="selectColor('blue')"
                  style="background-color: #2979FF;"  
                ></v-chip>
              </v-col>
              <v-col cols="auto">
                <v-chip
                  :class="['color-chip', { 'selected-chip': selectedColor === 'green' }]"
                  small
                  @click="selectColor('green')"
                  style="background-color: #00E676;"  
                ></v-chip>
              </v-col>
              <v-col cols="auto">
                <v-chip
                  :class="['color-chip', { 'selected-chip': selectedColor === 'gray' }]"
                  small
                  @click="selectColor('gray')"
                  style="background-color: #9E9E9E;"  
                ></v-chip>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-item>

      <v-divider class="mx-4 mb-1"></v-divider>

      <v-card-actions>
        <v-btn class="custom-btn" block border>
          Agregar al carrito
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

// Variable para almacenar el color seleccionado
const selectedColor = ref('')

// Función para seleccionar un color
function selectColor(color) {
  selectedColor.value = color
}
</script>

<style scoped>
.custom-card {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2); /* Más sombra */
}

.custom-btn {
  background-color: #FAB400 !important; /* Color de fondo del botón */
  color: black !important; /* Color del texto */
}

.custom-btn:hover {
  background-color: #ffca28 !important; /* Color del botón al hacer hover */
}

/* Estilos para los chips de color */
.color-chip {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

/* Chip seleccionado: Borde más visible */
.selected-chip {
  border: 3px solid #000000; /* Borde dorado para destacar la selección */
}
</style>
