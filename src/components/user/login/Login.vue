<template>
  <v-container
    class="d-flex flex-column align-center justify-center"
    
  >
    <v-card class="pa-4" max-width="400" flat>
      <!-- Encabezado de Bienvenida -->
      <h1 class="welcome-title text-center">Bienvenido</h1>
      <p class="subtitle text-center">
        Inicia sesión o
        <a href="#" class="link" @click.prevent="goToCreateAccount"
          >crea una cuenta</a
        >
      </p>

      <v-form>
        <!-- Campo de Email -->
        <v-text-field
          label="Email"
          v-model="email"
          type="email"
          outlined
          dense
        ></v-text-field>

        <!-- Campo de Contraseña -->
        <v-text-field
          label="Contraseña"
          v-model="password"
          type="password"
          outlined
          dense
        ></v-text-field>

        <!-- Enlace para olvidar la contraseña -->
        <div class="text-right forgot-password-container">
          <a
            href="#"
            class="forgot-password"
            @click.prevent="goToForgotPassword"
            >¿Olvidaste tu contraseña?</a
          >
        </div>

        <!-- Botón de Iniciar sesión -->
        <v-btn color="primary" class="login-button" @click="login">
          Iniciar sesión
        </v-btn>
      </v-form>

      <!-- Línea divisoria con texto "O" -->
      <div class="divider-container">
        <div class="divider"></div>
        <div class="divider-text">O</div>
        <div class="divider"></div>
      </div>

      <!-- Botón de Iniciar sesión con Google -->
      <v-btn outlined class="google-button" @click="loginWithGoogle">
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

const email = ref("");
const password = ref("");
const router = useRouter()

const emailAdmin = "admin@admin.com"
const emailUser = "user@user.com"

function goToCreateAccount() {
  // Lógica para redirigir a la página de creación de cuenta
  console.log("Redirigiendo a crear cuenta...");
  router.push({name: 'Register'})
}

function goToForgotPassword() {
  // Lógica para redirigir a la página de recuperación de contraseña
  console.log("Redirigiendo a recuperación de contraseña...");
  router.push({name: 'ChangePassword'})
}

function login() {
  // Lógica para iniciar sesión
  if(email.value == emailAdmin){
    console.log("Iniciando sesión con", email.value, password.value);
    router.push({name: 'AdminDetails'})
  }

  if(email.value == emailUser){
    console.log("Iniciando sesión con", email.value, password.value);
    router.push({name: 'UserDetails'})
  }
  
}

function loginWithGoogle() {
  // Lógica para iniciar sesión con Google
  console.log("Iniciando sesión con Google...");
}
</script>

<style scoped>
/* Estilos para el encabezado de bienvenida */
.welcome-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50; /* Color del título */
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1rem;
  color: #7d7d7d; /* Color del texto del subtítulo */
  margin-top: -10px; /* Ajuste para acercar el subtítulo al título */
  margin-bottom: 1.5rem; /* Espacio debajo del subtítulo */
}

.link {
  color: #0F1F39;
  text-decoration: underline;
  font-weight: 500;
}

.link:hover {
  text-decoration: none;
}

/* Estilos personalizados para el formulario */
.v-text-field__input {
  background-color: #f1f1f1 !important; /* Color de fondo de los inputs */
}

.v-card {
  box-shadow: none;
  width: 100%; /* Asegura que la tarjeta ocupe todo el ancho disponible */
}

.v-text-field {
  margin-bottom: 10px; /* Reduce el espacio entre los inputs */
}

.forgot-password-container {
  margin-top: -10px; /* Pega el texto al campo de contraseña */
  margin-bottom: 20px; /* Añade un espacio antes del botón */
}

.forgot-password {
  font-size: 0.875rem;
  color: #8E8E8E;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
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
  background-color: #8E8E8E;
}

.divider-text {
  padding: 0 10px;
  color: #8E8E8E;
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
  width: 20px;  /* Ajusta el tamaño de la G de Google */
  height: 20px;
  margin-right: 10px;
}

.google-icon {
  font-size: 18px; /* Ajusta el tamaño del icono de Google */
  margin-right: 10px;
}
</style>
