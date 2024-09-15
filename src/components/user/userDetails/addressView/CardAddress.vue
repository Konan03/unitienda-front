<template>
    <v-card class="pa-3 card-address" max-width="400px">
      <v-card-title class="justify-space-between">
        <div color="#0F1F39" >Dirección 1</div>
      </v-card-title>
      <v-card-text class="text-card">
        Calle 45 #9A 11 Limonar<br>
        5to sector<br>
        Casa primer piso<br>
        Colombia<br>
        Ibagué, Tolima 730006
      </v-card-text>
      <v-card-actions class="btn">
        <v-btn text color="#486594" @click="openDialog">
          Editar
          <v-icon right size="30">mdi-pencil</v-icon>
        </v-btn>
    </v-card-actions>
    </v-card>


    <!-- Modal para el formulario de edición -->
  <v-dialog v-model="isDialogOpen" max-width="600px">
    <v-card rounded="xl">
      <v-card-title class="headline">Editar Dirección</v-card-title>
      <v-card-text>
        <!-- Aquí va el formulario -->
        <v-form>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field rounded="lg" label="País" placeholder="Colombia" outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field rounded="lg" label="Departamento" placeholder="Tolima" outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field  rounded="lg" label="Ciudad" placeholder="Ibagué" outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field rounded="lg" label="Código postal" placeholder="730006" outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field rounded="lg" label="Dirección" placeholder="Calle 45 #9A-11" outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field rounded="lg" label="Barrio" placeholder="Limonar 5 sector" outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field rounded="lg" label="Destinatario" placeholder="Nombre de la persona" outlined></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="isDialogOpen = false">Cerrar</v-btn>
        <v-btn color="#486594" @click="saveAddress">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </template>
  
  <script setup>
import { ref } from 'vue';

// Control del estado del modal
const isDialogOpen = ref(false);

// Función para abrir el modal
const openDialog = () => {
  isDialogOpen.value = true;
};

// Función para simular la acción de guardar la dirección
const saveAddress = () => {
  // Aquí iría la lógica para guardar la dirección
  isDialogOpen.value = false; // Cierra el modal después de guardar
};
  </script>
  
  <style scoped>
  /* Estilos adicionales si son necesarios */
  .headline{
    color: #fab400;
  }
  .card-address{
    margin-bottom: 10px;
    border: 2px solid #979797

  }

  .text-card{
    color: #486594;
  }

  .btn {
    margin-top: -20px;
  margin-left: 140px;
}
  </style>
  