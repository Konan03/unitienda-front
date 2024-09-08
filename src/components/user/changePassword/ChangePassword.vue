<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <v-card
      class="mx-auto my-5 border-shadow pa-5"
      outlined
      elevation="5"
      max-width="800px"
      
    >
      <!-- Título -->
      <h1 class="title text-center">Cambio de contraseña</h1>
      <p class="subtitle text-center">
        Ingresa la dirección de correo electrónico o el número de teléfono móvil
        vinculado a tu cuenta.
      </p>

      <!-- Formulario -->
      <v-form>
        <!-- Campo de Email -->
        <v-text-field
          label="Email"
          v-model="email"
          type="email"
          outlined
          dense
          class="custom-text-field"
        ></v-text-field>

        <!-- Botones en columna -->
        <v-btn  class="custom-button continue-button mb-3" @click="handleContinue">Continuar</v-btn>
        <v-btn class="custom-button voltar-button  " @click="handleBack">Volver</v-btn>

      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'; 

const email = ref("");
const router = useRouter()

// Manejar acciones de los botones
function handleContinue() {
  console.log("Email ingresado:", email.value);
  router.push({name: 'VerifyCode'})
}

function handleBack() {
  console.log("Volver a la página anterior");
  router.push({name: 'Login'})
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
  margin-bottom: 40px;
}

/* Botones iguales */
.custom-button {
  background-color: #0f1f39 !important; /* Color del botón por defecto */
  color: white !important; /* Color del texto del botón */
  font-size: 1rem; /* Tamaño de fuente */
  padding: 10px 24px; /* Ajuste del padding */
  border-radius: 10px; /* Bordes más redondeados */
  width: 200px; /* El botón ocupa el 100% del ancho del card */
  height: 50px; /* Altura consistente para ambos botones */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto; /* Centra el botón horizontalmente */
  margin-bottom: 20px !important;
}

/* Modificación del botón "Volver" */
.voltar-button {
  background-color: #8E8E8E !important; /* Color del botón de volver */
  color: black !important; /* Color del texto del botón de volver */
  margin-bottom: 50px !important;
}


</style>
