<template>
  <v-container>
    <v-card
      class="pa-3 my-4 info-card"
      v-for="(cliente, index) in clientes"
      :key="cliente.id"
    >
      <v-row>
        <v-col cols="0.5" class="center-text">
          <strong>{{ index + 1 }}</strong>
        </v-col>

        <v-col cols="1.5" class="center-text">
          <v-row no-gutters>
            <v-col cols="12"><strong>Nombres</strong></v-col>
            <v-col cols="12">{{ cliente.nombre }}</v-col>
          </v-row>
        </v-col>

        <v-col cols="1.5" class="center-text">
          <v-row no-gutters>
            <v-col cols="12"><strong>Apellidos</strong></v-col>
            <v-col cols="12">{{ cliente.apellido }}</v-col>
          </v-row>
        </v-col>

        <v-col cols="1.5" class="center-text">
          <v-row no-gutters>
            <v-col cols="12"><strong>Teléfono</strong></v-col>
            <v-col cols="12">{{ cliente.telefono }}</v-col>
          </v-row>
        </v-col>

        <v-col cols="2.5" class="center-text">
          <v-row no-gutters>
            <v-col cols="12"><strong>Correo electrónico</strong></v-col>
            <v-col cols="12" class="text-truncate">{{ cliente.email }}</v-col>
          </v-row>
        </v-col>

        <v-col cols="1.5" class="center-text">
          <v-row no-gutters>
            <v-col cols="12"><strong>Tipo Documento</strong></v-col>
            <v-col cols="12">{{ cliente.tipoDocumento }}</v-col>
          </v-row>
        </v-col>

        <v-col cols="1.5" class="center-text">
          <v-row no-gutters>
            <v-col cols="12"><strong>No. documento</strong></v-col>
            <v-col cols="12">{{ cliente.numeroDocumento }}</v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllClientes } from '../../../../service/userService.js'; 

const clientes = ref([]);

// Llamar al endpoint al montar el componente
onMounted(async () => {
  try {
    const response = await getAllClientes();
    clientes.value = response;
    console.log("Clientes obtenidos:", clientes.value); // Verificación en consola
  } catch (error) {
    console.error("Error al obtener clientes:", error);
  }
});
</script>

<style scoped>
.info-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff7f7;
}

.center-text {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
