<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <v-card class="pa-4" max-width="400" flat>
      <h1 class="welcome-title text-center">Completar Perfil</h1>

      <v-form ref="completeProfileForm" v-model="valid">
        <v-row>
          <v-col>
            <v-text-field
              label="Nombre"
              v-model="nombre"
              outlined
              dense
              disabled
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Apellido"
              v-model="apellido"
              outlined
              dense
              disabled
            ></v-text-field>
          </v-col>
        </v-row>

        <v-text-field
          label="Número telefónico"
          v-model="telefono"
          type="tel"
          outlined
          dense
          :rules="[v => !!v || 'El teléfono es requerido']"
        ></v-text-field>

        <v-row>
          <v-col cols="4">
            <v-select
              label="Tipo de Documento"
              v-model="tipoDocumento"
              :items="['CC', 'TI', 'CE']"
              outlined
              dense
              :rules="[v => !!v || 'Tipo de documento es requerido']"
            />
          </v-col>
          <v-col cols="8">
            <v-text-field
              label="Número de documento"
              v-model="numeroDocumento"
              outlined
              dense
              :rules="[v => !!v || 'Número de documento es requerido']"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn color="primary" class="complete-profile-button" @click="completeProfile">
          Guardar
        </v-btn>

        <v-alert v-if="errorMessage" type="error" dense>{{ errorMessage }}</v-alert>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { completeUserProfile } from '../../service/userService.js';

const router = useRouter();
const valid = ref(true);
const errorMessage = ref("");

// Campos de entrada
const nombre = ref("Nombre guardado");
const apellido = ref("Apellido guardado");
const telefono = ref("");
const tipoDocumento = ref("");
const numeroDocumento = ref("");

// Función para completar el perfil
async function completeProfile() {
  if (valid.value) {
    try {
      const userProfileData = {
        telefono: telefono.value,
        tipoDocumento: tipoDocumento.value,
        numeroDocumento: numeroDocumento.value,
      };
      
      const response = await completeUserProfile(userProfileData);
      console.log("Perfil actualizado:", response);
      errorMessage.value = "";

      // Asegura la espera antes de la redirección
      setTimeout(() => {
        window.location.href = "/adminManagement"; 
      }, 2000); // Espera 2 segundos antes de redirigir
    } catch (error) {
      errorMessage.value = error.response?.data?.message || "Error al completar el perfil. Intente nuevamente.";
      console.error("Error en completar perfil:", error);
    }
  } else {
    errorMessage.value = "Por favor, complete todos los campos correctamente.";
  }
}
</script>

<style scoped>
/* Estilos personalizados */
.welcome-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #0f1f39;
  margin-bottom: 0.5rem;
}
.v-text-field__input, .v-select__input {
  background-color: #f1f1f1 !important;
}
.v-card {
  box-shadow: none;
  width: 100%;
}
.v-text-field, .v-select {
  margin-bottom: 10px;
}
.complete-profile-button {
  background-color: #0f1f39 !important;
  color: white !important;
  font-size: 1rem;
  padding: 10px 24px;
  border-radius: 10px;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
</style>
