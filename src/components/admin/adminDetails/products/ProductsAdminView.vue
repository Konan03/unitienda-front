<template>
  <h2 class="text-profile">Productos</h2>
  <v-card class="mx-auto pa-5" max-width="1300">
    <v-container fluid>
      <v-card-text class="scroll-container">
        <CardProductAdmin 
          v-for="product in products" 
          :key="product.id" 
          :product="product" 
          :recargarProductos="cargarProductos" 
        />
      </v-card-text>

      <v-card-actions>
        <v-btn text color="#486594" class="btn-add" @click="openDialog">
          Agregar producto
          <v-icon right size="30">mdi-database</v-icon>
        </v-btn>
      </v-card-actions>
    </v-container>
  </v-card>

  <!-- Modal para agregar producto -->
  <v-dialog v-model="isDialogOpen" max-width="900px">
    <v-card rounded="xl">
      <v-card-title>
        <span class="headline">Agregar Producto</span>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="4" class="d-flex flex-column align-center">
            <div v-for="(image, index) in previewImages" :key="index" class="image-preview">
              <img :src="image" alt="Imagen del producto" class="product-image" />
            </div>
            <v-btn icon @click="triggerFileInput">
              <v-icon>mdi-upload</v-icon>
            </v-btn>
            <input ref="fileInput" type="file" accept="image/*" multiple style="display: none" @change="onFileChange" />
            <p class="mt-2">Subir imágenes</p>
          </v-col>

          <v-col cols="12" md="8">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="Nombre del producto" v-model="newProduct.nombre" outlined></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Precio" v-model="newProduct.precio" outlined></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Tamaño" v-model="newProduct.tamaño" outlined></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn color="#8E8E8E" class="btn-add-color" block @click="openColorDialog">
                  Agregar colores
                  <v-icon right>mdi-plus</v-icon>
                </v-btn>
                <div v-if="colores.length" class="mt-2">
                  <p>Colores añadidos:</p>
                  <ul>
                    <li v-for="(color, index) in colores" :key="index">{{ color }}</li>
                  </ul>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <v-select :items="Array.from({ length: 100 }, (_, i) => (i + 1).toString())" label="Stock" v-model="newProduct.stock" outlined></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Descuento" v-model="newProduct.descuento" outlined></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select :items="['Libros', 'Termos', 'Papeleria', 'Ropa']" label="Categoría" v-model="newProduct.categoria" outlined></v-select>
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

  <!-- Diálogo para seleccionar colores -->
  <v-dialog v-model="isColorDialogOpen" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Seleccionar Colores</span>
      </v-card-title>
      <v-card-text>
        <v-select v-model="coloresSeleccionados" :items="coloresDisponibles" label="Elige uno o más colores" multiple outlined></v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn color="#486594" @click="agregarColores">Agregar Colores Seleccionados</v-btn>
        <v-btn text @click="closeColorDialog">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import CardProductAdmin from "./CardProductAdmin.vue";
import { agregarProducto, obtenerProductos } from "../../../../service/productService.js";

const products = ref([]);
const newProduct = ref({
  nombre: "",
  precio: "",
  tamaño: "",
  stock: "",
  descuento: "",
  categoria: "",
  imagenes: [],
});
const colores = ref([]);
const coloresSeleccionados = ref([]);
const coloresDisponibles = ref(["Rojo", "Azul", "Verde", "Amarillo", "Negro", "Blanco", "Morado", "Naranja", "Gris", "Rosa"]);
const isDialogOpen = ref(false);
const isColorDialogOpen = ref(false);
const selectedImages = ref([]);
const previewImages = ref([]); // Lista para almacenar las URLs de las imágenes de vista previa
const fileInput = ref(null);

const cargarProductos = async () => {
  try {
    products.value = await obtenerProductos();
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};
onMounted(cargarProductos);

const openDialog = () => {
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
  resetForm();
};

const openColorDialog = () => {
  isColorDialogOpen.value = true;
};

const closeColorDialog = () => {
  isColorDialogOpen.value = false;
};

const agregarColores = () => {
  colores.value = [...new Set([...colores.value, ...coloresSeleccionados.value])];
  coloresSeleccionados.value = [];
  closeColorDialog();
};

const saveProduct = async () => {
  try {
    const formData = new FormData();

    formData.append("producto", JSON.stringify({
      nombre: newProduct.value.nombre,
      precio: newProduct.value.precio,
      tamaño: newProduct.value.tamaño,
      stock: newProduct.value.stock,
      descuento: newProduct.value.descuento || 0,
      categoria: newProduct.value.categoria,
      colores: colores.value.length ? colores.value : ["No aplica"],
      imagenes: []
    }));

    selectedImages.value.forEach((file) => {
      formData.append("imagenes", file);
    });

    await agregarProducto(formData);
    closeDialog();
    cargarProductos();
  } catch (error) {
    console.error("Error al agregar producto:", error);
  }
};

const resetForm = () => {
  newProduct.value = {
    nombre: "",
    precio: "",
    tamaño: "",
    stock: "",
    descuento: "",
    categoria: "",
    imagenes: [],
  };
  colores.value = [];
  selectedImages.value = [];
  previewImages.value.forEach((url) => URL.revokeObjectURL(url)); // Liberar las URLs de las imágenes previas
  previewImages.value = [];
};

const onFileChange = (event) => {
  const nuevasImagenes = Array.from(event.target.files);
  selectedImages.value = [...selectedImages.value, ...nuevasImagenes];

  nuevasImagenes.forEach((file) => {
    previewImages.value.push(URL.createObjectURL(file));
  });

  console.log("Total de imágenes seleccionadas:", selectedImages.value.length);
  selectedImages.value.forEach((file, index) => {
    console.log(`Imagen seleccionada (${index + 1}):`, file.name);
  });
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace(",00", "");
};

// Liberar URLs de vista previa al desmontar
onUnmounted(() => {
  previewImages.value.forEach((url) => URL.revokeObjectURL(url));
});
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
.product-image {
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
}
.image-preview {
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
.placeholder-icon {
  font-size: 64px;
  color: #ddd;
}
.btn-add-color {
  height: 56px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.scroll-container {
  max-height: 477px;
  overflow-y: auto;
  padding-right: 16px;
}
</style>
