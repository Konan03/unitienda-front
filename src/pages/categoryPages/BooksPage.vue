<template>
  <v-container>
    <!-- Encabezado y botones de filtro/orden -->
    <v-row>
      <v-col class="d-flex align-center">
        <h1>Libros</h1>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-space-between">
      <v-col cols="auto">
        <v-btn variant="outlined" @click="filtroDialog = true" :disabled="loading">
          <v-icon left>mdi-filter</v-icon>
          Ver filtros
        </v-btn>

        <!-- Botón para abrir el cuadro de diálogo de ordenación -->
        <v-btn variant="outlined" class="ml-4" @click="ordenDialog = true" :disabled="loading">
          Ordenar por
          <v-icon right>mdi-chevron-down</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Cuadro de diálogo para seleccionar filtros -->
    <v-dialog v-model="filtroDialog" max-width="500">
      <v-card>
        <v-card-title>Filtros</v-card-title>
        <v-card-text>
          <v-list>
            <!-- Filtro de selección de colores -->
            <v-list-item>
              <div>Filtrar por colores:</div>
              <v-select
                v-model="selectedColors"
                :items="coloresDisponibles"
                label="Selecciona colores"
                multiple
                chips
                :loading="loading"
              ></v-select>
            </v-list-item>

            <!-- Filtro por rango de precios -->
            <v-list-item>
              <div class="filter-title">Filtrar por precio:</div>
              <v-list dense class="price-list">
                <v-list-item v-for="(range, index) in priceRanges" :key="index">
                  <v-checkbox
                    v-model="selectedPriceRange"
                    :value="range"
                    :label="`Entre ${formatPrice(range.min)} y ${formatPrice(range.max || 'más')}`"
                    class="checkbox-item"
                  ></v-checkbox>
                </v-list-item>
              </v-list>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="applyFilters" :disabled="loading">Aplicar Filtros</v-btn>
          <v-btn text @click="filtroDialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Cuadro de diálogo para ordenar productos -->
    <v-dialog v-model="ordenDialog" max-width="500">
      <v-card>
        <v-card-title>Ordenar por</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item @click="applySort('asc')">Precio ascendente</v-list-item>
            <v-list-item @click="applySort('desc')">Precio descendente</v-list-item>
            <v-list-item @click="applySort('nombre')">Nombre (A-Z)</v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="ordenDialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Mensaje si no se encuentran productos -->
    <v-row v-if="books.length === 0 && !loading">
      <v-col cols="12" class="text-center">
        <p>No se ha podido encontrar un producto con el parámetro requerido</p>
      </v-col>
    </v-row>

    <!-- Lista de productos -->
    <v-row v-else>
      <v-col cols="12" md="3" v-for="book in books" :key="book.id">
        <CardBooksCategory :product="book" :loading="loading" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CardBooksCategory from '@/components/cardsCategory/CardBooksCategory.vue';
import {
  filtrarPorColores,
  filtrarConDescuento,
  ordenarPorPrecioAsc,
  ordenarPorPrecioDesc,
  ordenarPorNombreAsc,
  filtrarPorRangoDePrecios,
  getProductosPorCategoria
} from '@/service/productService.js';

const books = ref([]);
const loading = ref(false); 
const filtroDialog = ref(false); 
const ordenDialog = ref(false); 
const selectedColors = ref([]); 
const selectedPriceRange = ref(null); // Almacena el rango de precios seleccionado
const coloresDisponibles = ["Rojo", "Azul", "Verde", "Amarillo", "Negro", "Blanco", "Morado", "Naranja", "Gris", "Rosa"];

// Definir los rangos de precios
const priceRanges = [
  { min: 0, max: 20000 },
  { min: 20001, max: 40000 },
  { min: 40001, max: 60000 },
  { min: 60001, max: 80000 },
  { min: 80001, max: 100000 },
  { min: 100001, max: null } // Rango superior sin límite máximo
];

// Cargar productos de la categoría "Libros"
const loadProducts = async () => {
  loading.value = true;
  try {
    const response = await getProductosPorCategoria("Libros");
    books.value = response;
  } catch (error) {
    console.error('Error al cargar productos de la categoría "Libros":', error);
  } finally {
    loading.value = false;
  }
};

onMounted(loadProducts);

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

// Aplica los filtros seleccionados (colores y rango de precios)
const applyFilters = async () => {
  filtroDialog.value = false;
  loading.value = true;
  try {
    // Aplicar filtro por colores si está seleccionado
    if (selectedColors.value.length > 0) {
      books.value = await filtrarPorColores(selectedColors.value, "Libros");
    } else {
      await loadProducts();
    }

    // Aplicar filtro por rango de precios si está seleccionado
    if (selectedPriceRange.value) {
      const { min, max } = selectedPriceRange.value;
      const allInRange = await filtrarPorRangoDePrecios(min, max || Number.MAX_SAFE_INTEGER);
      books.value = allInRange.filter(product => product.categoria === "Libros");
    }
  } catch (error) {
    console.error("Error al aplicar los filtros:", error);
  } finally {
    loading.value = false;
  }
};

// Función para aplicar ordenamiento
const applySort = async (sortType) => {
  ordenDialog.value = false;
  loading.value = true;
  try {
    let sortedProducts = [];
    if (sortType === 'asc') {
      sortedProducts = await ordenarPorPrecioAsc();
    } else if (sortType === 'desc') {
      sortedProducts = await ordenarPorPrecioDesc();
    } else if (sortType === 'nombre') {
      sortedProducts = await ordenarPorNombreAsc();
    }
    books.value = sortedProducts.filter(product => product.categoria === "Libros");
  } catch (error) {
    console.error(`Error al ordenar por ${sortType}:`, error);
  } finally {
    loading.value = false;
  }
};
</script>


<style scoped>
.
.filter-title {
  margin-bottom: 14px;
}

.price-list {
  padding-top: 0;
  padding-bottom: 0;
}

.checkbox-item {
  margin-top: -15px;
  margin-bottom: -30px;
}
</style>
