<template>
  <h2 class="text-profile">Perfil</h2>
  <v-card class="mx-auto pa-5 card-perfil" max-width="1300">
    <v-card-text>
      <v-row>
        <v-col cols="6" class="data"> <strong>Nombre:</strong> Laura </v-col>
        <v-col cols="6" class="data"> <strong>Apellido:</strong> Rojas </v-col>
        <v-col cols="6" class="data">
          <strong>Telefono:</strong> 3105982315
        </v-col>
        <v-col cols="6" class="data">
          <strong>Email:</strong> 2220201026@estudiantesunibague.edu.co
        </v-col>
        <v-col cols="6" class="data">
          <strong>Tipo de documento:</strong> CC
        </v-col>
        <v-col cols="6" class="data">
          <strong>No. de documento:</strong> 1234567890
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="#486594" @click="openDialog">
        Editar
        <v-icon right size="30">mdi-pencil</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>

  <!-- Modal detalles de editar perfil -->
  <v-dialog v-model="isDialogOpen" max-width="1000px">
    <v-card rounded="xl">
      <v-card-title>
        <span class="headline">Editar perfil</span>
      </v-card-title>

      <v-card-text>
        <v-text-field rounded="lg" label="Nombre" placeholder="Agrega tu nuevo nombre" outlined></v-text-field>  
        <v-text-field rounded="lg" label="Apellido" placeholder="Agrega tu nuevo apellido" outlined></v-text-field>  
        <v-text-field rounded="lg" label="Telefono" placeholder="334455667" outlined></v-text-field>  
        <v-text-field rounded="lg" label="Tipo de documento" placeholder="000111222" outlined></v-text-field> 
        <v-text-field rounded="lg" label="No. de Documento" placeholder="0002223344" outlined></v-text-field> 
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#486594" text >Guardar</v-btn>
        <v-btn color="#486594" text @click="closeCard">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

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

.card-perfil {
  border: 2px solid #12223d;
}

.data {
  font-size: 25px;
  margin-bottom: 108.5px;
}

.text-profile {
  font-size: 60px;
  color: #fab400;
  margin-bottom: 19px;
  margin-left: 70px;
}
</style>
