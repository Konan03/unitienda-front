<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card
          v-for="(producto, index) in localProductos"
          :key="producto.id"
          class="mb-4"
          outlined
          style="border: 1px solid black; padding: 16px;"
        >
          <v-row class="d-flex align-center">
            <!-- Imagen del producto -->
            <v-img
              :src="getProductImage(producto.imagenes, 0)"
              width="100"
              height="100"
              class="mr-4"
            ></v-img>

            <!-- Descripción del producto -->
            <div class="text-left" style="flex-grow: 1;">
              <div><strong style="font-size: 18px;">{{ producto.nombre }}</strong></div>
              <div v-if="producto.colores.length" style="font-size: 16px;">
                Color: {{ producto.colores.join(', ') }}
              </div>
              <div v-if="producto.tamaño" style="font-size: 16px;">Tamaño: {{ producto.tamaño }}</div>

              <!-- Mostrar precios -->
              <div class="font-weight-bold mt-2" style="font-size: 18px;">
                <span v-if="producto.precioOriginal" class="original-price">
                  {{ formatPrice(producto.precioOriginal) }}
                </span>
                <span class="discounted-price">{{ formatPrice(producto.precio) }}</span>
              </div>
            </div>

            <!-- Opciones de cantidad y eliminar -->
            <div class="d-flex flex-column align-center">
              <v-btn icon @click="removeItem(index)" class="mb-2">
                <v-icon>mdi-delete</v-icon>
              </v-btn>

              <v-select
                v-model="localProductos[index].cantidad"
                :items="[1, 2, 3, 4, 5]"
                dense
                hide-details
                style="width: 70px; font-size: 16px;"
                :label="'Cantidad'"
              ></v-select>
            </div>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="showError" color="red" top>{{ errorMessage }}</v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { actualizarCantidadProducto, eliminarProductoDelCarrito } from '../../../service/cartService.js';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  productos: Array // Recibe los productos como prop desde el componente padre
});

const emit = defineEmits(['update:productos']);

// Crear una copia reactiva de productos y asegurar que cada producto tenga una cantidad inicial
const localProductos = reactive(props.productos.map(producto => ({
  ...producto,
  cantidad: producto.cantidad || 1 // Asignar la cantidad proporcionada o un valor por defecto de 1
})));

const showError = ref(false);
const errorMessage = ref('');

// Función para construir la URL de la imagen o usar una imagen predeterminada
const getProductImage = (imagenes, index) => {
  return (imagenes && imagenes.length > 0)
    ? `http://localhost:8080/images/${imagenes[index]}`
    : '/src/assets/img/libro.png';
};

// Función para eliminar el producto
const removeItem = async (index) => {
  try {
    const productoId = localProductos[index].id;
    await eliminarProductoDelCarrito(productoId);
    localProductos.splice(index, 1);
    emit('update:productos', localProductos); // Emitir actualización al padre
  } catch (error) {
    handleError('Error al eliminar el producto');
  }
};

// Watcher para actualizar la cantidad del producto cuando cambia
const updateQuantity = async (producto) => {
  if (producto.id && producto.cantidad) {
    try {
      await actualizarCantidadProducto(producto.id, producto.cantidad);
      emit('update:productos', localProductos); // Emitir actualización al padre
    } catch (error) {
      handleError('Error al actualizar la cantidad del producto');
    }
  }
};

// Watch para monitorear cambios en producto.cantidad y llamar a updateQuantity
watch(
  () => localProductos.map((p) => p.cantidad), // Observa cambios en la cantidad de cada producto
  (newQuantities, oldQuantities) => {
    newQuantities.forEach((newQuantity, index) => {
      if (newQuantity !== oldQuantities[index]) {
        updateQuantity(localProductos[index]);
      }
    });
  }
);

// Función para formatear el precio
const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace(",00", "");
};
// Manejador de errores
const handleError = (message) => {
  errorMessage.value = message;
  showError.value = true;
};
</script>

<style scoped>
.mr-4 {
  margin-right: 16px;
}
.original-price {
  text-decoration: line-through;
  color: grey;
  margin-right: 8px;
}
.discounted-price {
  font-weight: bold;
}
</style>
