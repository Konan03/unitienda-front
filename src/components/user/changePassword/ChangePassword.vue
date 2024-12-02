<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <v-card class="mx-auto my-5 border-shadow pa-5" outlined elevation="5" max-width="800px">
      <!-- Título -->
      <h1 class="title text-center">Cambio de contraseña</h1>
      <p class="subtitle text-center">
        Ingresa la dirección de correo electrónico o el número de teléfono móvil
        vinculado a tu cuenta.
      </p>

      <!-- Formulario -->
      <v-form ref="resetForm" v-model="valid">
        <!-- Campo de Email -->
        <v-text-field
          label="Email"
          v-model="email"
          type="email"
          outlined
          dense
          class="custom-text-field"
          :rules="[v => !!v || 'El email es requerido', v => /.+@.+\..+/.test(v) || 'Email no válido']"
        ></v-text-field>

        <!-- Mensaje de error -->
        <v-alert v-if="errorMessage" type="error" dense>{{ errorMessage }}</v-alert>

        <!-- Botones en columna -->
        <v-btn class="custom-button continue-button mb-3" @click="handleContinue">Continuar</v-btn>
        <v-btn class="custom-button voltar-button" @click="handleBack">Volver</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { sendResetPasswordCode } from '.../../../../../service/userService.js';  // Asegúrate de que el path sea correcto

const email = ref("");
const errorMessage = ref("");
const router = useRouter();
const valid = ref(true);

// Manejar acción del botón "Continuar"
async function handleContinue() {
  if (valid.value) {
    try {
      // Guardar el email en localStorage
      localStorage.setItem('email', email.value);

      // Enviar el código de restablecimiento
      const response = await sendResetPasswordCode(email.value);
      console.log("Respuesta del backend:", response);  // Confirmación en consola
      errorMessage.value = "";  // Limpia el mensaje de error en caso de éxito

      // Redirigir a la siguiente página
      router.push({ name: 'VerifyCode' });
    } catch (error) {
      errorMessage.value = error.response?.data?.message || "Error al enviar el código. Intente nuevamente.";
    }
  } else {
    errorMessage.value = "Por favor, ingrese un email válido.";
  }
}

// Manejar acción del botón "Volver"
function handleBack() {
  router.push({ name: 'Login' });
}
</script>

<style scoped>
/* Título y subtítulo */
.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #0f1f39;
  margin-top: 40px;
}

.subtitle {
  font-size: 1.5rem;
  color: #8e8e8e;
  margin-bottom: 2rem;
  margin-left: 50px;
  margin-right: 50px;
}

.border-shadow {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.custom-text-field {
  width: 400px;
  margin-bottom: 20px;
  margin: 0 auto;
}

.custom-button {
  background-color: #0f1f39 !important;
  color: white !important;
  font-size: 1rem;
  padding: 10px 24px;
  border-radius: 10px;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 20px !important;
}

.voltar-button {
  background-color: #8E8E8E !important;
  color: black !important;
  margin-bottom: 50px !important;
}
</style>
