<template>
  <h2 class="title">Direcciones</h2>
  <v-card class="mx-auto pa-5 main-card" max-width="1300">
    <v-container class="scroll-container" fluid>
    <v-row>
      <v-col
        v-for="(address, index) in addresses"
        :key="index"
        cols="12" md="6" lg="4" xl="3" 
        class="mb-4"
      >
        
          <CardAddress />
        
      </v-col>
    </v-row>
  </v-container>
    <v-card-actions class="btn">
        <v-btn text color="#486594"  @click="openAddDialog">
          Añadir nueva direccion
          <v-icon right size="30">mdi-plus</v-icon>
        </v-btn>
    </v-card-actions>
  </v-card>

  <!-- Modal para añadir una nueva dirección -->
  <v-dialog v-model="isAddDialogOpen" max-width="600px">
    <v-card rounded="xl">
      <v-card-title class="headline">Añadir Nueva Dirección</v-card-title>
      <v-card-text>
        <!-- Aquí va el formulario para añadir -->
        <v-form>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field rounded="lg" label="País" placeholder="Colombia" outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field rounded="lg" label="Departamento" placeholder="Tolima" outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field rounded="lg" label="Ciudad" placeholder="Ibagué" outlined></v-text-field>
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
        <v-btn text @click="isAddDialogOpen = false">Cerrar</v-btn>
        <v-btn color="#486594" @click="addNewAddress">Añadir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import CardAddress from "./CardAddress.vue";
import { ref } from "vue";

// Simulación de las direcciones (puedes agregar más)
const addresses = [{ id: 1, name: 'Dirección 1' },
  { id: 2, name: 'Dirección 2' },
  { id: 3, name: 'Dirección 3' },
  { id: 4, name: 'Dirección 4' },
  { id: 5, name: 'Dirección 5' },{ id: 1, name: 'Dirección 1' },
  { id: 2, name: 'Dirección 2' },
  { id: 3, name: 'Dirección 3' },
  { id: 4, name: 'Dirección 4' },
  { id: 5, name: 'Dirección 5' },
  // Añade tantas direcciones como necesites
];

// Control del estado del modal para añadir nueva dirección
const isAddDialogOpen = ref(false);

// Función para abrir el modal de añadir nueva dirección
const openAddDialog = () => {
  isAddDialogOpen.value = true;
};

// Función para añadir la nueva dirección (simulación)
const addNewAddress = () => {
  // Aquí puedes agregar la lógica para guardar la nueva dirección
  isAddDialogOpen.value = false; // Cierra el modal después de añadir la dirección
};
</script>

<style scoped>

.headline{
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
</style>
