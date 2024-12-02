<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <v-card class="pa-4" max-width="400" flat>
      <h1 class="welcome-title text-center">Crear una cuenta</h1>

      <v-form ref="registerForm" v-model="valid">
        <v-row>
          <v-col>
            <v-text-field
              label="Nombre"
              v-model="nombre"
              outlined
              dense
              :rules="[v => !!v || 'El nombre es requerido']"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="Apellido"
              v-model="apellido"
              outlined
              dense
              :rules="[v => !!v || 'El apellido es requerido']"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-text-field
          label="Email"
          v-model="email"
          type="email"
          outlined
          dense
          :rules="[v => !!v || 'El email es requerido', v => /.+@.+\..+/.test(v) || 'Email no válido']"
        ></v-text-field>

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

        <v-text-field
          label="Contraseña"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          outlined
          dense
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="togglePasswordVisibility"
          :rules="[v => !!v || 'La contraseña es requerida', v => v.length >= 6 || 'Mínimo 6 caracteres']"
        ></v-text-field>

        <v-text-field
          label="Confirmar contraseña"
          v-model="confirmPassword"
          type="password"
          outlined
          dense
          :rules="[v => v === password || 'Las contraseñas no coinciden']"
        ></v-text-field>

        <v-btn color="primary" class="register-button" @click="register">
          Registrarse
        </v-btn>

        <v-alert v-if="errorMessage" type="error" dense>{{ errorMessage }}</v-alert>
      </v-form>

      <p class="text-center mt-4">
        ¿Ya tienes una cuenta?
        <a href="#" class="link" @click.prevent="goToLogin">Inicia Sesión</a>
      </p>

      <div class="divider-container">
        <div class="divider"></div>
        <div class="divider-text">O</div>
        <div class="divider"></div>
      </div>

      <!-- Botón de Google Sign-In -->
      <div id="googleSignInBtn"></div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { registerUser } from '.../../../../../service/userService.js';

const router = useRouter();
const valid = ref(true);
const errorMessage = ref("");

// Campos de entrada
const nombre = ref("");
const apellido = ref("");
const email = ref("");
const telefono = ref("");
const tipoDocumento = ref("");
const numeroDocumento = ref("");
const password = ref("");
const confirmPassword = ref("");

// Google Client ID
const googleClientId = "936811548223-quhuv450ebf50s525g6h7vkskjjug23j.apps.googleusercontent.com";

// Control de visibilidad de contraseña
const showPassword = ref(false);

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

// Inicializa el botón de Google en modo redirección
onMounted(() => {
  console.log("Inicializando Google Sign-In");
  
  google.accounts.id.initialize({
    client_id: googleClientId,
    callback: handleCredentialResponse,
    ux_mode: "popup",
    redirect_uri:"http://localhost:3000/details"
 
  });

  google.accounts.id.renderButton(
    document.getElementById("googleSignInBtn"),
    { theme: "outline", size: "large" }
  );
});

// Función para manejar la respuesta del token de Google
function handleCredentialResponse(response) {
  const idToken = response.credential;
  console.log("ID Token recibido en frontend:", idToken);

  // Intento de autenticación con Google
  registerWithGoogle(idToken);
}

// Función para enviar el token al backend y guardar el token JWT
async function registerWithGoogle(idToken) {
  try {
    const res = await fetch('http://localhost:8080/auth/google/success', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      
      if (data.perfilCompleto) {
        setTimeout(() => {
        window.location.href = "http://localhost:3000/details";
      }, 2000);
      } else {
        router.push({ name: 'CompleteProfile' });
      }
    } else {
      console.error("Error en la autenticación:", data);
      alert("Error en la autenticación con Google. Verifica la consola para más detalles.");
    }
  } catch (error) {
    console.error("Error en la comunicación con el servidor:", error);
    alert("Hubo un problema al comunicarse con el servidor. Verifica la consola.");
  }
}

function goToLogin() {
  router.push({ name: 'Login' });
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
.register-button {
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
.google-button {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0f1f39 !important;
  font-size: 0.875rem;
  border-radius: 10px;
  width: 100%;
  max-width: 250px;
  padding: 8px 16px;
  margin: 0 auto;
}
.google-logo {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.link {
  color: #0F1F39;
  text-decoration: underline;
  font-weight: 500;
}
</style>
