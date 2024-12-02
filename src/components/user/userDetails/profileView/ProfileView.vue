<template>
  <h2 class="text-profile">Perfil</h2>
  <v-card class="mx-auto pa-5 card-perfil" max-width="1300">
    <v-card-text>
      <v-row>
        <v-col cols="6" class="data"> <strong>Nombre:</strong> {{ user.nombre }} </v-col>
        <v-col cols="6" class="data"> <strong>Apellido:</strong> {{ user.apellido }} </v-col>
        <v-col cols="6" class="data">
          <strong>Teléfono:</strong> {{ user.telefono }}
        </v-col>
        <v-col cols="6" class="data">
          <strong>Email:</strong> {{ user.email }}
        </v-col>
        <v-col cols="6" class="data">
          <strong>Tipo de documento:</strong> {{ user.tipoDocumento }}
        </v-col>
        <v-col cols="6" class="data">
          <strong>No. de documento:</strong> {{ user.numeroDocumento }}
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

  <!-- Modal para editar perfil -->
  <v-dialog v-model="isDialogOpen" max-width="1000px">
    <v-card rounded="xl">
      <v-card-title>
        <span class="headline">Editar perfil</span>
      </v-card-title>

      <v-card-text>
        <v-text-field v-model="user.nombre" rounded="lg" label="Nombre" outlined></v-text-field>  
        <v-text-field v-model="user.apellido" rounded="lg" label="Apellido" outlined></v-text-field>  
        <v-text-field v-model="user.telefono" rounded="lg" label="Teléfono" outlined></v-text-field>  
        <v-text-field v-model="user.tipoDocumento" rounded="lg" label="Tipo de documento" outlined></v-text-field> 
        <v-text-field v-model="user.numeroDocumento" rounded="lg" label="No. de Documento" outlined></v-text-field> 
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#486594" text @click="updateUserProfile">Guardar</v-btn>
        <v-btn color="#486594" text @click="closeDialog">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCurrentUser, updateUser } from '../../../../service/userService.js'; // Ajusta la ruta según tu estructura de archivos

// Variables reactivas
const user = ref({});
const isDialogOpen = ref(false);

// Obtener la información del usuario al cargar el componente
onMounted(async () => {
  try {
    const userData = await getCurrentUser();
    user.value = userData;
  } catch (error) {
    console.error("Error al obtener la información del usuario:", error);
  }
});

// Función para abrir el modal de edición
const openDialog = () => {
  isDialogOpen.value = true;
};

// Función para cerrar el modal de edición
const closeDialog = () => {
  isDialogOpen.value = false;
};

// Función para actualizar la información del usuario
const updateUserProfile = async () => {
  try {
    const updatedData = await updateUser(user.value.id, user.value);
    user.value = updatedData; // Actualizar la vista con la nueva información
    closeDialog(); // Cerrar el modal después de guardar
    console.log("Perfil actualizado con éxito");
  } catch (error) {
    console.error("Error al actualizar el perfil del usuario:", error);
  }
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
  margin-bottom: 20px;
}

.text-profile {
  font-size: 60px;
  color: #fab400;
  margin-bottom: 19px;
  margin-left: 70px;
}
</style>
