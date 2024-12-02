<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <v-card class="pa-4" max-width="400" flat>
      <h1 class="welcome-title text-center">Bienvenido</h1>
      <p class="subtitle text-center">
        Inicia sesión o
        <a href="#" class="link" @click.prevent="goToCreateAccount">crea una cuenta</a>
      </p>

      <v-form>
        <v-text-field
          label="Email"
          v-model="email"
          type="email"
          outlined
          dense
          :error-messages="emailError"
        ></v-text-field>

        <v-text-field
          label="Contraseña"
          v-model="password"
          type="password"
          outlined
          dense
          :error-messages="passwordError"
        ></v-text-field>

        <div class="text-right forgot-password-container">
          <a href="#" class="forgot-password" @click.prevent="goToForgotPassword">¿Olvidaste tu contraseña?</a>
        </div>

        <v-btn color="primary" class="login-button" @click="login">
          Iniciar sesión
        </v-btn>
        
        <!-- Mensaje de error general -->
        <div v-if="generalError" class="error-message">{{ generalError }}</div>
      </v-form>

      <div class="divider-container">
        <div class="divider"></div>
        <div class="divider-text">O</div>
        <div class="divider"></div>
      </div>

      <div id="googleSignInBtn"></div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router'; 
import { loginUser, getCurrentUser } from '.../../../../../service/userService.js';

const emits = defineEmits(['login-success']);
const email = ref("");
const password = ref("");
const router = useRouter();
const emailError = ref("");
const passwordError = ref("");
const generalError = ref("");

// Google Client ID
const googleClientId = "936811548223-quhuv450ebf50s525g6h7vkskjjug23j.apps.googleusercontent.com";

onMounted(() => {
  google.accounts.id.initialize({
    client_id: googleClientId,
    callback: handleCredentialResponse,
    ux_mode: "popup",
    redirect_uri: "http://localhost:3000/details"
  });

  google.accounts.id.renderButton(
    document.getElementById("googleSignInBtn"),
    { theme: "outline", size: "large" }
  );
});

async function login() {
  emailError.value = "";
  passwordError.value = "";
  generalError.value = "";

  if (!email.value) {
    emailError.value = "Por favor, ingrese su correo electrónico.";
  }
  if (!password.value) {
    passwordError.value = "Por favor, ingrese su contraseña.";
  }
  
  if (emailError.value || passwordError.value) {
    return;
  }

  try {
    const token = await loginUser({ email: email.value, password: password.value });
    if (token) {
      localStorage.setItem("token", token);

      // Lógica para verificar si el usuario es admin
      const userInfo = await getCurrentUser(); // Este método debe obtener la información del usuario
      const isAdmin = userInfo.tipoUsuario === "Admin";

      if (isAdmin) {
        setTimeout(() => {
          window.location.href = "/adminManagement"; // Redirigir a adminManagement si es admin
        }, 1000); // Esperar un segundo antes de redirigir
      } else {
        setTimeout(() => {
          window.location.href = "/details"; // Redirigir a detalles si no es admin
        }, 1000);
      }
    } else {
      generalError.value = "Error: Token no recibido";
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    generalError.value = "Credenciales incorrectas. Por favor, verifique sus datos.";
  }
}

function handleCredentialResponse(response) {
  const idToken = response.credential;
  console.log("ID Token recibido en frontend:", idToken);

  registerWithGoogle(idToken);
}

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

      // Redirigir a la página de detalles después de 2 segundos
      setTimeout(() => {
        window.location.href = "http://localhost:3000/details";
      }, 2000);
    } else {
      console.error("Error en la autenticación:", data);
      alert("Error en la autenticación con Google. Verifica la consola para más detalles.");
    }
  } catch (error) {
    console.error("Error en la comunicación con el servidor:", error);
    alert("Hubo un problema al comunicarse con el servidor. Verifica la consola.");
  }
}

const goToCreateAccount = () => {
  router.push({ name: 'Register' });
};

const goToForgotPassword = () => {
  router.push({ name: 'ChangePassword' });
};
</script>


<style scoped>
.welcome-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1rem;
  color: #7d7d7d;
  margin-top: -10px;
  margin-bottom: 1.5rem;
}

.link {
  color: #0F1F39;
  text-decoration: underline;
  font-weight: 500;
}

.link:hover {
  text-decoration: none;
}

.v-text-field__input {
  background-color: #f1f1f1 !important;
}

.v-card {
  box-shadow: none;
  width: 100%;
}

.v-text-field {
  margin-bottom: 10px;
}

.forgot-password-container {
  margin-top: -10px;
  margin-bottom: 20px;
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

.error-message {
  color: red;
  margin-top: 15px;
  text-align: center;
}

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
</style>
