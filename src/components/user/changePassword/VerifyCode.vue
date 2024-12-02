<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <v-card class="mx-auto my-5 border-shadow pa-5" outlined elevation="5" max-width="800px">
      <!-- Título -->
      <h1 class="title text-center">Verificación</h1>
      <p class="subtitle text-center">
        Para proceder, por favor completa este paso de verificación.
        Hemos enviado un código a tu correo electrónico. Ingresa el código a continuación.
      </p>

      <!-- Formulario -->
      <v-form ref="verifyForm" v-model="valid">
        <!-- Campo de Código -->
        <v-text-field
          label="Ingresar el código"
          v-model="code"
          type="text"
          outlined
          dense
          class="custom-text-field"
          :rules="[v => !!v || 'El código es requerido']"
        ></v-text-field>

        <!-- Alerta de éxito para el reenvío del código -->
        <v-alert v-if="successMessage" type="success" dense outlined class="success-alert">{{ successMessage }}</v-alert>

        <!-- Mensaje de error -->
        <v-alert v-if="errorMessage" type="error" dense outlined class="error-alert">{{ errorMessage }}</v-alert>

        <!-- Botón de Continuar -->
        <v-btn class="custom-button continue-button mb-3" @click="handleContinue">Continuar</v-btn>

        <!-- Enlace para reenviar el código -->
        <div class="text-center resend-container">
          <a href="#" class="resend" @click.prevent="reSendCode">Reenviar código</a>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { verifyResetPasswordCode, sendResetPasswordCode } from '.../../../../../service/userService.js';  // Asegúrate de que el path sea correcto

const router = useRouter();
const valid = ref(true);
const code = ref("");
const successMessage = ref("");
const errorMessage = ref("");

// Recuperar el email guardado en localStorage
const email = ref(localStorage.getItem('email') || "");

// Función para manejar la verificación del código
async function handleContinue() {
  if (valid.value) {
    try {
      const response = await verifyResetPasswordCode(email.value, code.value);
      console.log("Código verificado con éxito:", response);
      errorMessage.value = "";  // Limpia el mensaje de error en caso de éxito
      successMessage.value = "";  // Limpia cualquier mensaje de éxito

      // Redirigir a la página de cambio de contraseña
      router.push({ name: 'Login' });
    } catch (error) {
      errorMessage.value = error.response?.data?.message || "Error al verificar el código. Intente nuevamente.";
    }
  } else {
    errorMessage.value = "Por favor, ingrese el código de verificación.";
  }
}

// Función para reenviar el código de verificación
async function reSendCode() {
  try {
    const response = await sendResetPasswordCode(email.value);
    console.log("Código reenviado con éxito:", response);
    successMessage.value = "Código reenviado exitosamente.";
    errorMessage.value = "";  // Limpia el mensaje de error
  } catch (error) {
    errorMessage.value = error.response?.data?.message || "Error al reenviar el código. Intente nuevamente.";
  }
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
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* Sombreado */
  border-radius: 10px;
}

.custom-text-field {
  width: 400px; /* Ajusta el tamaño del campo de texto */
  margin-bottom: 20px; /* Espacio debajo del campo */
  margin: 0 auto;
  margin-bottom: 30px;
}

/* Botones */
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
}

/* Contenedor de reenviar código */
.resend-container {
  margin-bottom: 20px !important;
  margin-top: -10px !important;
}

/* Enlace de reenviar código */
.resend {
  font-size: 1rem;
  color: #8E8E8E;
  text-decoration: none;
}

.resend:hover {
  text-decoration: underline;
}

/* Estilos de alerta */
.success-alert {
  background-color: #e0f7e9 !important; /* Color de fondo verde claro para éxito */
  color: #2e7d32 !important; /* Color de texto verde oscuro */
  margin-bottom: 20px;
  border-radius: 5px;
 
}

.error-alert {
  margin-bottom: 15px;
  border-radius: 5px;
}
</style>
