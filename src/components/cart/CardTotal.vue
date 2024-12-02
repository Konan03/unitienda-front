<template>
  <v-card outlined class="pa-4" style="border: 1px solid #32486C; max-width: 350px;">
    <!-- Subtotal -->
    <v-row>
      <v-col cols="auto">
        <span>Subtotal</span>
      </v-col>
      <v-col class="text-right">
        <span>{{ totalCarrito }}</span>
      </v-col>
    </v-row>

    <!-- Gastos de envío -->
    <v-row>
      <v-col cols="auto">
        <span>Gastos de envío</span>
      </v-col>
      <v-col class="text-right">
        <span>{{ gastosEnvio }}</span>
      </v-col>
    </v-row>

    <!-- Total -->
    <v-row>
      <v-col cols="auto">
        <span class="font-weight-bold">Total</span>
      </v-col>
      <v-col class="text-right">
        <span class="font-weight-bold" style="color: #264983;">{{ totalCarritoConEnvio }}</span>
      </v-col>
    </v-row>

    <!-- Botón de Comprar Ahora -->
    <v-row class="mt-4">
      <v-col class="text-center">
        <v-btn color="#FAB400" dark rounded large @click="emitirCompra">
          Comprar ahora
        </v-btn>
      </v-col>
    </v-row>

    <!-- Alerta de error si no se selecciona un método de pago -->
    <v-row v-if="errorMensaje" class="mt-2">
      <v-col class="text-center">
        <p style="color: red;">{{ errorMensaje }}</p>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, onMounted, watch, defineEmits } from 'vue';
import { obtenerTotalCarrito } from "../../service/cartService.js";

// Prop para recibir el método de pago desde el componente padre
const props = defineProps({
  metodoPago: {
    type: String,
    required: true,
  }
});

// Emitir el evento 'comprar' para notificar al componente padre
const emit = defineEmits(['comprar']);

const totalCarrito = ref('$ 0.00');
const gastosEnvio = ref('$ 0.00');
const totalCarritoConEnvio = ref('$ 0.00');
const errorMensaje = ref("");  // Mensaje de error para mostrar debajo del botón

// Función para formatear los valores de moneda
function formatCurrency(value) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value).replace('COP', '').trim();
}

// Función para obtener el total del carrito
async function fetchTotalCarrito() {
  try {
    const total = await obtenerTotalCarrito();
    totalCarrito.value = formatCurrency(total);
    calcularGastosEnvio();
  } catch (error) {
    console.error("Error al obtener el total del carrito:", error);
  }
}

// Función para calcular los gastos de envío en función del método de pago
function calcularGastosEnvio() {
  let envio = 0;
  const metodo = props.metodoPago ? props.metodoPago.toLowerCase() : '';

  if (metodo !== 'reserva') {
    envio = 5000;
  }
  gastosEnvio.value = formatCurrency(envio);
  totalCarritoConEnvio.value = formatCurrency(
    parseInt(totalCarrito.value.replace(/\D/g, '')) + envio
  );
  
  console.log("Gastos de envío calculados:", gastosEnvio.value, "Método de pago:", metodo); // Verificación
}

// Función para emitir el evento 'comprar' al hacer clic en el botón de compra
function emitirCompra() {
  if (!props.metodoPago) {
    // Muestra el mensaje de error si no se ha seleccionado un método de pago
    errorMensaje.value = "Debes elegir un método de pago antes de comprar.";
  } else {
    // Si el método de pago está seleccionado, emite el evento y borra el mensaje de error
    errorMensaje.value = "";
    const isGanaGana = props.metodoPago.toLowerCase() === 'ganagana';
    emit('comprar', { isGanaGana });
  }
}

// Llamada inicial para obtener el total del carrito al montar el componente
onMounted(() => {
  fetchTotalCarrito();
});

// Observador para recalcular los gastos de envío cuando cambia el método de pago
watch(() => props.metodoPago, calcularGastosEnvio);
</script>
