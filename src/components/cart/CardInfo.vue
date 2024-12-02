<template>
  <v-card outlined class="pa-4" style="border: 1px solid #797575;">
    <v-row align="center" justify="space-between">
      <!-- Ícono de número 1 y título -->
      <v-col cols="auto" class="d-flex align-center">
        <v-avatar color="#0F1F39" size="32" class="mr-2">
          <span class="white--text">1</span>
        </v-avatar>
        <span class="headline font-weight-bold" style="color: #0F1F39;">Tus datos</span>
      </v-col>

      <!-- Ícono de perfil -->
      <v-col cols="auto">
        <v-icon color="#0F1F39">mdi-account</v-icon>
      </v-col>
    </v-row>

    <!-- Información del usuario -->
    <v-row>
      <v-col cols="12">
        <div>{{ userData.email }}</div>
        <div>Nombre: {{ userData.nombre }} {{ userData.apellido }}</div>
        <div>Teléfono: {{ userData.telefono }}</div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCurrentUser } from '../../service/userService.js'; // Asegúrate de que esta ruta sea correcta

const userData = ref({
  email: '',
  nombre: '',
  apellido: '',
  telefono: ''
});

const fetchUserData = async () => {
  try {
    const response = await getCurrentUser();
    userData.value = {
      email: response.email,
      nombre: response.nombre,
      apellido: response.apellido,
      telefono: response.telefono
    };
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
  }
};

onMounted(() => {
  fetchUserData();
});
</script>
