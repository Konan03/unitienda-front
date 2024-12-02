<template>
  <v-container class="d-flex justify-center">
    <v-row class="w-100" no-gutters>
      <!-- Columna izquierda fija -->
      <v-col cols="7">
        <div class="d-flex flex-column" style="min-height: 600px; padding-right: 16px;">
          <CardInfo class="mb-4"/>
          <CardSend 
            class="mt-4 mb-4" 
            :metodo-pago="metodoPagoSeleccionado" 
            @update-direccion="actualizarDireccionId"
          />
          <CardPay 
            @update-metodo-pago="actualizarMetodoPago" 
            @update-tarjeta-seleccionada="actualizarTarjetaSeleccionada" 
          />
        </div>
      </v-col>

      <!-- Columna derecha -->
      <v-col cols="5">
        <div style="border: 1px solid #797575; padding: 16px; max-height: 400px; max-width: 500px; overflow-y: auto;">
          <div v-if="cartProducts.length > 0" class="d-flex flex-column">
            <div v-for="(product, index) in cartProducts" :key="index" class="mb-4">
              <CardProduct :product="product" @remove-product="removeProduct(index)"/>
            </div>
          </div>
          <div v-else class="d-flex align-center justify-center" style="height: 100%;">
            <p>No hay productos en tu carrito</p>
          </div>
        </div>

        <div class="d-flex justify-center mt-4">
          <p style="background-color: #d9d9d9; padding: 10px; border-radius: 4px; text-align: center;">
            El precio indicado es por unidad del producto;<br> el total de tu compra se mostrará<br> en el siguiente resumen.
          </p>
        </div>

        <div class="d-flex justify-center mt-6">
          <div style="width: 300px;">
            <CardTotal :metodoPago="metodoPagoSeleccionado" @comprar="crearOrden" />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CardInfo from "@/components/cart/CardInfo.vue";
import CardSend from "@/components/cart/CardSend.vue";
import CardPay from "@/components/cart/CardPay.vue";
import CardProduct from "@/components/cart/CardProduct.vue";
import CardTotal from "@/components/cart/CardTotal.vue";
import { obtenerCarrito } from '../../service/cartService.js';
import orderService from '../../service/orderService.js';
import payService from '../../service/payService.js';

const router = useRouter(); // Router para la redirección
const cartProducts = ref([]);
const direccionId = ref(null);
const metodoPagoSeleccionado = ref(null);
const tarjetaSeleccionada = ref(null);

// Funciones de actualización de datos desde los componentes hijos
const actualizarDireccionId = (id) => direccionId.value = id;
const actualizarMetodoPago = (metodo) => metodoPagoSeleccionado.value = metodo;
const actualizarTarjetaSeleccionada = (tarjeta) => tarjetaSeleccionada.value = tarjeta;

// Función para obtener el carrito desde el endpoint y transformarlo
const fetchCartProducts = async () => {
  try {
    const carrito = await obtenerCarrito();
    if (Array.isArray(carrito.detalles)) {
      cartProducts.value = carrito.detalles.map(item => ({
        producto: {
          id: item.producto?.id || item.id,
          nombre: item.producto?.nombre || item.name || 'Producto desconocido',
          imagenes: item.producto?.imagenes || item.imagenes || [],
        },
        cantidad: item.cantidad || 1, 
        precioTotal: item.precioTotal || item.price || 0
      }));
    } else {
      console.error("Error: 'detalles' en la respuesta del carrito no es un array.", carrito);
      cartProducts.value = [];
    }
  } catch (error) {
    console.error("Error al cargar el carrito:", error);
  }
};

// Llamada a `fetchCartProducts` cuando el componente se monta
onMounted(() => {
  fetchCartProducts();
});

// Función para eliminar productos del carrito
const removeProduct = (index) => {
  cartProducts.value.splice(index, 1);
};

// Función para crear la orden y descargar factura si es GANAGANA
const crearOrden = async () => {
  if ((metodoPagoSeleccionado.value !== 'reserva' && !direccionId.value) || !metodoPagoSeleccionado.value || !cartProducts.value.length) {
    console.error("Faltan datos para crear la orden. Por favor, selecciona todos los detalles requeridos.");
    return;
  }

  const metodoPagoParaBackend = (metodoPagoSeleccionado.value === 'credito' || metodoPagoSeleccionado.value === 'debito')
    ? 'TARJETA'
    : metodoPagoSeleccionado.value;

  const subtotal = cartProducts.value.reduce((total, item) => total + item.precioTotal, 0);

  try {
    // Crear la orden
    const orden = await orderService.crearOrdenDesdeCarrito(
      direccionId.value,
      tarjetaSeleccionada.value?.id || null,
      metodoPagoParaBackend,
      subtotal
    );

    console.log("Orden creada exitosamente:", orden);

    // ** Verificación de `detallesCarrito` en la respuesta de la orden **
    if (orden.detallesCarrito && orden.detallesCarrito.length > 0) {
      cartProducts.value = orden.detallesCarrito.map(detalle => ({
        producto: {
          id: detalle.producto.id,
          nombre: detalle.producto.nombre,
          imagenes: detalle.producto.imagenes || []
        },
        cantidad: detalle.cantidad,
        precioTotal: detalle.precioTotal
      }));
      console.log("Detalles del carrito actualizados en el frontend:", cartProducts.value);
    } else {
      console.error("Detalles del carrito no encontrados en la respuesta de la orden:", orden);
    }

    // Generar el pago para la orden creada
    await generarPago(orden.id, subtotal);

    // Si el método de pago es GANAGANA, descarga la factura
    if (metodoPagoSeleccionado.value === 'ganagana') {
      await descargarFactura(orden.id);
    }

    // Esperar 3 segundos antes de redirigir a ConfirmPayPage.vue
    setTimeout(() => {
      router.push({ name: 'ConfirmPayPage' });
    }, 3000);
  } catch (error) {
    console.error("Error al crear la orden o generar el pago:", error);
  }
};

// Función para generar el pago
const generarPago = async (ordenId, monto) => {
  try {
    const respuestaPago = await payService.crearPago(ordenId, monto, metodoPagoSeleccionado.value);
    console.log("Pago generado exitosamente:", respuestaPago);
  } catch (error) {
    console.error("Error al generar el pago:", error);
  }
};

// Función para descargar la factura
const descargarFactura = async (ordenId) => {
  try {
    const factura = await facturaService.descargarFactura(ordenId);
    const url = window.URL.createObjectURL(new Blob([factura.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Factura-${ordenId}.pdf`);
    document.body.appendChild(link);
    link.click();
    console.log("Factura descargada exitosamente");
  } catch (error) {
    console.error("Error al descargar la factura:", error);
  }
};
</script>

<style scoped>
h2 {
  font-size: 2rem;
  font-weight: bold;
}
.text-micarrito {
  margin-right: -890px;
}
</style>
