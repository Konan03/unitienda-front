<template>
  <v-container
    class="d-flex flex-column align-center justify-center"
    
  >
    <v-card class="pa-4" max-width="400" flat>
      <!-- Encabezado de Registro -->
      <h1 class="welcome-title text-center">Crear una cuenta</h1>

      <v-form>
        <!-- Nombre y Apellido -->
        <v-row>
          <v-col>
            <v-text-field
              label="Nombre"
              v-model="nombre"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Apellido"
              v-model="apellido"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Email -->
        <v-text-field
          label="Email"
          v-model="email"
          type="email"
          outlined
          dense
        ></v-text-field>

        <!-- Número Telefónico -->
        <v-text-field
          label="Número telefónico"
          v-model="telefono"
          type="tel"
          outlined
          dense
        ></v-text-field>

        <!-- Tipo y Número de Documento -->
        <v-row>
          <v-col cols="4">
            <v-select
              label="Tipo"
              v-model="tipoDocumento"
              :items="['CC', 'TI', 'CE']"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="8">
            <v-text-field
              label="Número de documento"
              v-model="numeroDocumento"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Contraseña -->
        <v-text-field
          label="Contraseña"
          v-model="password"
          type="password"
          outlined
          dense
          hint="La contraseña debe tener como mínimo 6 caracteres"
          persistent-hint
        ></v-text-field>

        <!-- Confirmar Contraseña -->
        <v-text-field
          label="Confirmar contraseña"
          v-model="confirmPassword"
          type="password"
          outlined
          dense
        ></v-text-field>

        <!-- Botón de Registrarse -->
        <v-btn color="primary" class="register-button" @click="register">
          Registrarse
        </v-btn>
      </v-form>

      <!-- Enlace para iniciar sesión -->
      <p class="text-center mt-4">
        ¿Ya tienes una cuenta?
        <a href="#" class="link" @click.prevent="goToLogin">Inicia Sesión</a>
      </p>

      <!-- Línea divisoria con texto "O" -->
      <div class="divider-container">
        <div class="divider"></div>
        <div class="divider-text">O</div>
        <div class="divider"></div>
      </div>

      <!-- Botón de Continuar con Google -->
      <v-btn outlined class="google-button" @click="registerWithGoogle">
        <img
          src="@/assets/img/logoGoogle.png"
          alt="Google G logo"
          class="google-logo"
        />
        Continuar con Google
      </v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'; 

const router = useRouter()

const nombre = ref("");
const apellido = ref("");
const email = ref("");
const telefono = ref("");
const tipoDocumento = ref("");
const numeroDocumento = ref("");
const password = ref("");
const confirmPassword = ref("");

function register() {
  // Lógica para el registro
  console.log("Registrando usuario con:", {
    nombre: nombre.value,
    apellido: apellido.value,
    email: email.value,
    telefono: telefono.value,
    tipoDocumento: tipoDocumento.value,
    numeroDocumento: numeroDocumento.value,
    password: password.value,
  });
}

function goToLogin() {
  // Lógica para redirigir a la página de inicio de sesión
  console.log("Redirigiendo a la página de inicio de sesión...");
  router.push({name: 'Login'})
}

function registerWithGoogle() {
  // Lógica para registro con Google
  console.log("Registrándose con Google...");
}
</script>

<style scoped>
/* Estilos para el encabezado de registro */
.welcome-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #0f1f39; /* Color del título */
  margin-bottom: 0.5rem;
}

/* Estilos personalizados para el formulario */
.v-text-field__input,
.v-select__input {
  background-color: #f1f1f1 !important; /* Color de fondo de los inputs */
}

.v-card {
  box-shadow: none;
  width: 100%; /* Asegura que la tarjeta ocupe todo el ancho disponible */
}

.v-text-field,
.v-select {
  margin-bottom: 10px; /* Reduce el espacio entre los inputs */
}

.register-button {
  background-color: #0f1f39 !important; /* Color del botón */
  color: white !important; /* Color del texto del botón */
  font-size: 1rem; /* Tamaño de fuente */
  padding: 10px 24px; /* Ajuste del padding */
  border-radius: 10px; /* Bordes más redondeados */
  width: auto; /* El botón se ajusta a su contenido */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto; /* Centra el botón horizontalmente */
}

/* Línea divisoria */
.divider-container {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.divider {
  flex-grow: 1;
  height: 1px;
  background-color: #8e8e8e;
}

.divider-text {
  padding: 0 10px;
  color: #8e8e8e;
}

/* Botón de Google */
.google-button {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0f1f39 !important;
  font-size: 0.875rem; /* Tamaño más pequeño */
  border-radius: 10px;
  width: 100%;
  max-width: 250px; /* Ajusta el ancho máximo del botón */
  padding: 8px 16px; /* Ajuste del padding para hacerlo más pequeño */
  margin: 0 auto; /* Centra el botón horizontalmente */
}

.google-logo {
  width: 20px; /* Ajusta el tamaño de la G de Google */
  height: 20px;
  margin-right: 10px;
}

.link {
  color: #0F1F39;
  text-decoration: underline;
  font-weight: 500;
}
</style>
