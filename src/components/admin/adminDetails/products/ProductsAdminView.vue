<template>
  <h2 class="text-profile">Productos</h2>
  <v-card class="mx-auto pa-5" max-width="1300">
    <v-container fluid>
      <!-- Contenedor con scroll -->
      <v-card-text class="scroll-container">
        <!-- Simular múltiples productos -->
        <CardProductAdmin v-for="(product, index) in products" :key="index" />
      </v-card-text>

      <v-card-actions>
        <v-btn text color="#486594" class="btn-add" @click="openDialog">
          Agregar producto
          <v-icon right size="30">mdi-database</v-icon>
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>

  <!-- Modal de tamaño XL -->
  <v-dialog v-model="isDialogOpen" max-width="900px">
    <v-card rounded="xl">
      <v-card-title>
        <span class="headline">Agregar Producto</span>
      </v-card-title>

      <v-card-text>
        <!-- Formulario con campo para agregar una imagen -->
        <v-row>
          <!-- Columna para agregar la imagen -->
          <v-col cols="12" md="4" class="d-flex flex-column align-center">
            <!-- Donde se cargará la imagen -->
            <div class="image-preview">
              <img
                v-if="selectedImage"
                :src="selectedImage"
                alt="Imagen del producto"
                class="product-image"
              />
              <v-icon v-else class="placeholder-icon">mdi-image</v-icon>
            </div>

            <!-- Ícono de carga de imagen que dispara la selección de archivo -->
            <v-btn icon @click="triggerFileInput">
              <v-icon>mdi-upload</v-icon>
            </v-btn>

            <!-- Campo de archivo oculto -->
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              style="display: none"
              @change="onFileChange"
            />

            <p class="mt-2">Subir imagen</p>
          </v-col>

          <!-- Columna del formulario -->
          <v-col cols="12" md="8">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Nombre del producto"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Precio" outlined></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field label="Tamaño" outlined></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn color="#8E8E8E" class="btn-add-color" block>
                  Agregar colores
                  <v-icon right>mdi-plus</v-icon>
                </v-btn>
              </v-col>

              <v-col cols="12" md="6">
                <v-select
                  :items="
                    Array.from({ length: 100 }, (_, i) => (i + 1).toString())
                  "
                  label="Stock"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Descuento" outlined></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-select
                  :items="['Categoria 1', 'Categoria 2']"
                  label="Categoría"
                  outlined
                ></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn color="#486594" @click="saveProduct">Agregar producto</v-btn>
        <v-btn text @click="closeDialog">Volver</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import CardProductAdmin from "./CardProductAdmin.vue";
import { ref } from "vue";

// Simular un listado de productos
const products = ref([
  { name: "Producto 1" },
  { name: "Producto 2" },
  { name: "Producto 3" },
  { name: "Producto 4" },
  { name: "Producto 5" },
  { name: "Producto 6" },
  { name: "Producto 7" },
  { name: "Producto 8" },
]);

const isDialogOpen = ref(false); // Controlar si el modal está abierto o cerrado
const selectedImage = ref(null); // Imagen seleccionada para previsualización
const fileInput = ref(null); // Referencia al input de archivo

const openDialog = () => {
  isDialogOpen.value = true; // Abre el modal
};

const closeDialog = () => {
  isDialogOpen.value = false; // Cierra el modal
};

const saveProduct = () => {
  // Aquí va la lógica para guardar el producto
  console.log("Producto guardado");
  closeDialog(); // Cierra el modal después de guardar el producto
};

// Función para abrir el selector de archivos
const triggerFileInput = () => {
  fileInput.value.click(); // Dispara la selección de archivo
};

// Función para manejar el cambio de imagen
const onFileChange = (file) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      selectedImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
    console.log("Archivo seleccionado:", file);
  }
};
</script>

<style scoped>
.btn-add {
  margin-left: 1000px;
  margin-top: 4px;
}

.v-card {
  border: 2px solid #12223d;
}

.text-profile {
  font-size: 60px;
  color: #fab400;
  margin-bottom: 19px;
  margin-left: 70px;
}

/* Imagen del producto */
.product-image {
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
}

/* Estilos para la vista previa de imagen y su ícono */
.image-preview {
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}

.placeholder-icon {
  font-size: 64px;
  color: #ddd;
}

/* Botón de agregar colores */
.btn-add-color {
  height: 56px; /* Altura para igualar a los campos de texto */
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.scroll-container {
  max-height: 477px; /* Altura máxima del área de productos */
  overflow-y: auto; /* Habilitar scroll vertical */
  padding-right: 16px; /* Espacio para la barra de scroll */
}
</style>
