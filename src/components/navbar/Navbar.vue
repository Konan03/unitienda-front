<template>
  <v-container>
    <v-app-bar :elevation="7" color="primary" dark>
      <v-row align="center" justify="space-between" class="w-100">
        <v-col cols="auto" class="d-flex align-center">
          <img src="/src/assets/img/unibague 2.png" alt="Logo" class="logo" />
          <v-app-bar-title class="white--text ml-3">
            Tienda<br />Universitaria
          </v-app-bar-title>
        </v-col>
        <v-col cols="auto" class="d-flex justify-center flex-grow-1">
          <v-text-field
            v-model="search"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            clearable
            hide-details
            single-line
            class="search-bar"
          ></v-text-field>
        </v-col>
        <v-col cols="auto" class="d-flex align-center">
          <v-icon color="#FAB400">mdi-account</v-icon>

          <!-- Menú de usuario con activador personalizado -->
          <div v-if="isAuthenticated" class="position-relative">
            <v-btn
              @click="toggleMenu"
              class="ml-2 mr-4"
              text
              color="white"
            >
              Hola, {{ userName }}
            </v-btn>
            
            <!-- Menú personalizado que se muestra/oculta al hacer clic -->
            <div v-if="isMenuOpen" class="custom-menu">
              <v-list>
                <v-list-item @click="goToProfile">
                  <v-list-item-title>Mi perfil</v-list-item-title>
                </v-list-item>
                <v-list-item @click="logoutUser">
                  <v-list-item-title>Salir</v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
          </div>
          <div v-else>
            <v-btn class="ml-2 mr-4" @click="goToLogin">
              Iniciar sesión / Registrar
            </v-btn>
          </div>

          <v-btn icon class="mr-4" @click="openDialog">
            <v-icon color="#FAB400">mdi-cart</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-app-bar class="colorBar2">
      <v-row align="center" justify="start" class="w-100 no-gutters">
        <v-app-bar-nav-icon
          class="logo no-margin"
          color="white"
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-btn class="no-margin" color="white" @click="goToHome">Inicio</v-btn>
        <v-btn class="no-margin" color="white" @click="goToUnibague">Unibagué</v-btn>
        <v-btn class="no-margin" color="white" @click="goToMap">Mapa</v-btn>
      </v-row>
    </v-app-bar>

    <!-- Modal del carrito -->
    <v-dialog v-model="isDialogOpen" max-width="600px">
      <v-card rounded="xl">
        <v-card-title class="headline text-center" color="#264983">Carrito</v-card-title>
        <v-card-text>
          <div style="max-height: 300px; overflow-y: auto; overflow-x: hidden; border: 1px solid #797575; padding: 10px;">
            <v-row>
              <v-col cols="12">
                <CardCart :productos="cartProducts" class="mb-5" />
              </v-col>
            </v-row>
          </div>
          <v-row>
            <v-col cols="12" class="text-center mt-5">
              <div><strong>Subtotal</strong>: {{ formatPrice(subTotal) }}</div>
              <div><strong>Total</strong>: {{ formatPrice(totalCarrito) }}</div>
              <div class="text-caption mt-1">
                Los gastos del envío serán calculados antes de finalizar la compra
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn text @click="isDialogOpen = false">Cerrar</v-btn>
          <v-btn color="#32486C" @click="goToCart">Comprar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6" style="color: #264983">
              Categorías
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        
        <!-- Elementos de la lista de navegación con redirección -->
        <v-list-item link @click="goToPageBooks">
          <v-list-item-content>
            <v-list-item-title>Libros</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="goToPageThermos">
          <v-list-item-content>
            <v-list-item-title>Termos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="goToPageStationery">
          <v-list-item-content>
            <v-list-item-title>Papelería</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="goToPageClothes">
          <v-list-item-content>
            <v-list-item-title>Ropa</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import CardCart from "./cardCart/CardCart";
import { obtenerCarrito } from '../../service/cartService.js';
import { getCurrentUser, logout } from '../../service/userService.js';

const router = useRouter();
const drawer = ref(false);
const search = ref("");
const isDialogOpen = ref(false);

const isAuthenticated = ref(false);
const userName = ref("");
const isMenuOpen = ref(false); // Estado para controlar el menú personalizado

// Productos en el carrito y total
const cartProducts = ref([]);
const totalCarrito = ref(0);

// Subtotal calculado localmente
const subTotal = computed(() => {
  return cartProducts.value.reduce((acc, product) => acc + (product.precio * product.cantidad), 0);
});

// Formato de precio
const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace(",00", "");
};

// Verificar autenticación y cargar el carrito
onMounted(() => {
  checkAuthentication();
  cargarCarrito();
});

// Función para alternar el menú personalizado
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Función para verificar si el usuario está autenticado
const checkAuthentication = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const user = await getCurrentUser();
      isAuthenticated.value = true;
      userName.value = user?.nombre || "Usuario";
    } catch (error) {
      console.error("Error al obtener el usuario actual:", error);
      logoutUser();
    }
  }
};

// Función para abrir el modal del carrito y actualizar el total
const openDialog = async () => {
  await cargarCarrito();
  totalCarrito.value = subTotal.value;
  isDialogOpen.value = true;
};



const goToProfile = async () => {
  isMenuOpen.value = false;

  try {
    const user = await getCurrentUser(); // Llama a getCurrentUser para obtener la información actual del usuario
    if (user && user.tipoUsuario === "Admin") {
      router.push({ path: "/adminManagement" });
    } else {
      router.push({ path: "/details" });
    }
  } catch (error) {
    console.error("Error al obtener el usuario actual:", error);
    router.push({ name: "Login" }); // Redirige al login si hay un error
  }
};

// Función para cerrar sesión y recargar la página
const logoutUser = async () => {
  try {
    await logout(); // Llama al servicio de logout
    localStorage.removeItem('token');
    isAuthenticated.value = false;
    userName.value = "";
    isMenuOpen.value = false;
    router.push({ name: "Login" }); // Redirige a /login después de cerrar sesión
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
// Funciones de redirección principales
const goToLogin = () => {
  router.push({ name: "Login" });
};

const goToCart = () => {
  isDialogOpen.value = false;
  router.push({ name: "Cart" });
};

const goToMap = () => {
  router.push({ name: "Map" });
};

const goToHome = () => {
  router.push({ name: "Home" });
};

const goToUnibague = () => {
  window.open("https://www.unibague.edu.co/", "_blank");
};

// Funciones de redirección de categorías
const goToPageBooks = () => {
  router.push({ name: "Books" });
};

const goToPageThermos = () => {
  router.push({ name: "Thermos" });
};

const goToPageStationery = () => {
  router.push({ name: "Stationery" });
};

const goToPageClothes = () => {
  router.push({ name: "Clothes" });
};

// Función para cargar productos del carrito
const cargarCarrito = async () => {
  try {
    const carrito = await obtenerCarrito();
    console.log("Respuesta de la API del carrito:", carrito);

    if (Array.isArray(carrito?.detalles) && carrito.detalles.length > 0) {
      cartProducts.value = carrito.detalles.map((detalle) => ({
        id: detalle.producto.id,
        nombre: detalle.producto.nombre,
        colores: detalle.producto.colores || [],
        tamaño: detalle.producto.tamaño || "No especificado",
        precio: detalle.producto.precioConDescuento || detalle.producto.precio,
        precioOriginal: detalle.producto.precioConDescuento ? detalle.producto.precio : null,
        imagenes: detalle.producto.imagenes || [],
        cantidad: detalle.cantidad,
      }));
    } else {
      console.warn("No se encontraron detalles en el carrito.");
      cartProducts.value = [];
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Usuario no autorizado. Redirigiendo a login.");
      router.push({ name: "Login" });
    } else {
      console.error("Error al obtener los productos del carrito:", error);
    }
  }
};


</script>

<style scoped>
.headline {
  color: #264983;
}
.no-gutters {
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.no-margin {
  margin: 0 !important;
  padding: 0 8px !important;
}
.logo {
  max-width: 50px;
  margin-left: 20px;
}
.search-bar {
  width: 100%;
  max-width: 600px;
}
.v-app-bar {
  background-color: #051024 !important;
}
.colorBar2 {
  background-color: #0f1f39 !important;
}
.v-app-bar-title {
  font-size: 18px;
  line-height: 1.2;
  margin: 0;
}
.v-icon.mr-4 {
  margin-right: 30px;
}
.custom-menu {
  background: white;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: fixed;
  top: 70px;
  right: 20px;
  z-index: 9999;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}
.custom-menu .v-list-item-title {
  color: #264983;
}
.custom-menu div:hover {
  background-color: #e0e0e0;
}
</style>
