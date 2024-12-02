<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <v-card
      class="mx-auto my-5 border-shadow pa-5"
      outlined
      elevation="5"
      max-width="800px"
    >
      <h1 class="title text-center">Nueva Contraseña</h1>
      <p class="subtitle text-center">
        Ingresa tu nueva contraseña.
      </p>

      <v-form>
        <v-text-field
          label="Contraseña"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          outlined
          dense
          hint="La contraseña debe tener como mínimo 6 caracteres"
          persistent-hint
          class="custom-text-field"
          :rules="[v => !!v || 'La contraseña es requerida', v => v.length >= 6 || 'Mínimo 6 caracteres']"
        ></v-text-field>

        <v-text-field
          label="Confirmar contraseña"
          v-model="confirmPassword"
          :type="showPassword ? 'text' : 'password'"
          outlined
          dense
          class="custom-text-field"
          :rules="[v => v === password || 'Las contraseñas no coinciden']"
        ></v-text-field>

        <v-checkbox
          v-model="showPassword"
          label="Mostrar contraseñas"
          class="mt-3 mb-3"
        ></v-checkbox>

        <v-alert v-if="errorMessage" type="error" dense>{{ errorMessage }}</v-alert>
        <v-alert v-if="successMessage" type="success" dense>{{ successMessage }}</v-alert>

        <v-btn
          class="custom-button continue-button mb-3"
          @click="handleContinue"
        >Aceptar</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { resetPassword } from '.../../../../../service/userService.js'; // Asegúrate de que el path sea correcto

const password = ref("");
const confirmPassword = ref("");
const email = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const valid = ref(true);
const showPassword = ref(false);
const router = useRouter();

onMounted(() => {
  // Recuperar el email desde localStorage
  email.value = localStorage.getItem("email");
});

// Manejar acción del botón "Aceptar"
async function handleContinue() {
  if (valid.value && password.value === confirmPassword.value) {
    try {
      const response = await resetPassword(email.value, password.value);
      console.log("Respuesta del backend:", response);

      successMessage.value = "Contraseña actualizada exitosamente.";
      errorMessage.value = ""; // Limpia el mensaje de error en caso de éxito

      // Limpiar el email de localStorage después de cambiar la contraseña
      localStorage.removeItem("email");

      setTimeout(() => router.push({ name: 'Login' }), 2000);
    } catch (error) {
      errorMessage.value = error.response?.data?.message || "Error al actualizar la contraseña. Intente nuevamente.";
      successMessage.value = "";
      console.error("Error al actualizar la contraseña:", error);
    }
  } else {
    errorMessage.value = "Por favor, complete todos los campos correctamente.";
    successMessage.value = "";
  }
}
</script>

<style scoped>
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
  margin-bottom: 50px !important;
}

.v-alert {
  margin-bottom: 20px;
}

.success-alert {
  background-color: #e0f7e9 !important; /* Color de fondo verde claro para éxito */
  color: #2e7d32 !important; /* Color de texto verde oscuro */
  margin-bottom: 20px;
  border-radius: 5px;
 
}

</style>
