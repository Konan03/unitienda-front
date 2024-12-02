<template>
   <v-card class="pa-3 my-4 product-card">
    <v-row>
      <!-- Imagen del producto -->
      <v-col cols="2" class="d-flex align-center justify-center">
        <img
          :src="product.imagenes && product.imagenes.length > 0 ? getImageUrl(product.imagenes[0]) : '/path/to/placeholder.jpg'"
          alt="Producto"
          class="product-image"
        />
      </v-col>

      <!-- Información del producto -->
      <v-col cols="8">
        <v-row>
          <v-col cols="12" md="2"><strong>Nombre:</strong><br />{{ product.nombre }}</v-col>
          <v-col cols="12" md="2"><strong>Precio:</strong><br />{{ formatPrice(product.precio) }}</v-col>
          <v-col cols="12" md="2"><strong>Tamaño:</strong><br />{{ product.tamaño }}</v-col>
          <v-col cols="12" md="2">
            <strong>Colores</strong><br />
            {{ product.colores && Array.isArray(product.colores) ? product.colores.join(", ") : "No disponible" }}
          </v-col>
          <v-col cols="12" md="2"><strong>Stock:</strong><br />{{ product.stock }}</v-col>
          <v-col cols="12" md="2"><strong>Descuento:</strong><br />{{ formatDiscount(product.descuento) }}</v-col>
        </v-row>
      </v-col>

      <!-- Botones de acción con íconos -->
      <v-col cols="2" class="d-flex flex-column align-end justify-center">
        <a href="#" class="delete-link" @click.prevent="confirmDelete">
          <v-icon left color="red">mdi-delete</v-icon> Eliminar
        </a>
        <a href="#" class="edit-link" @click.prevent="openDialog">
          <v-icon left color="blue">mdi-pencil</v-icon> Editar
        </a>
      </v-col>
    </v-row>
  </v-card>

  <!-- Modal de edición -->
  <v-dialog v-model="isDialogOpen" max-width="900px">
    <v-card rounded="xl">
      <v-card-title>
        <span class="headline">Editar Producto</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <!-- Vista previa de las imágenes seleccionadas -->
          <v-col cols="12" md="4" class="d-flex flex-column align-center">
            <div v-for="(image, index) in selectedImages" :key="index" class="image-preview">
              <img :src="image" alt="Imagen del producto" class="product-image" />
            </div>
            <v-btn icon @click="triggerFileInput">
              <v-icon>mdi-upload</v-icon>
            </v-btn>
            <input ref="fileInput" type="file" accept="image/*" multiple style="display: none" @change="onFileChange" />
            <p class="mt-2">Subir imágenes</p>
          </v-col>

          <!-- Formulario de edición de producto -->
          <v-col cols="12" md="8">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="Nombre del producto" v-model="editedProduct.nombre" outlined></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Precio" v-model="editedProduct.precio" outlined></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Tamaño" v-model="editedProduct.tamaño" outlined></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select :items="Array.from({ length: 100 }, (_, i) => (i + 1).toString())" label="Stock" v-model="editedProduct.stock" outlined></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Descuento" v-model="editedProduct.descuento" outlined></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select :items="['Libros', 'Termos', 'Papeleria', 'Ropa']" label="Categoría" v-model="editedProduct.categoria" outlined></v-select>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn color="#486594" @click="updateProduct">Guardar producto</v-btn>
        <v-btn color="red" @click="confirmDelete">Eliminar</v-btn>
        <v-btn text @click="closeDialog">Volver</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { defineProps } from "vue";
import { actualizarProducto, eliminarProducto } from "../../../../service/productService.js";

const props = defineProps({
  product: Object,
  recargarProductos: Function
});

const isDialogOpen = ref(false);
const editedProduct = ref({ ...props.product });
const selectedImages = ref([]);
const fileInput = ref(null);

const getImageUrl = (imagen) => `http://localhost:8080/images/${encodeURIComponent(imagen)}`;
const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,  // Sin decimales
    maximumFractionDigits: 0   // Sin decimales
  }).format(price).replace(",00", ""); // Reemplazar los decimales si aparecen
};
const formatDiscount = (discount) => {
  return discount > 0 ? `${discount}%` : "No aplica";
};

const openDialog = () => {
  isDialogOpen.value = true;
  editedProduct.value = { ...props.product };
};

const closeDialog = () => {
  isDialogOpen.value = false;
  editedProduct.value = {};
  selectedImages.value = [];
};

const updateProduct = async () => {
  try {
    const formData = new FormData();
    formData.append("producto", JSON.stringify(editedProduct.value));
    selectedImages.value.forEach((file) => formData.append("imagenes", file));
    await actualizarProducto(editedProduct.value.id, formData);
    closeDialog();
    props.recargarProductos(); // Recargar la lista de productos en el componente padre
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
  }
};

const onFileChange = (event) => {
  selectedImages.value = Array.from(event.target.files);
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const confirmDelete = async () => {
  if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
    try {
      await eliminarProducto(props.product.id);
      props.recargarProductos(); // Recargar la lista de productos en el componente padre
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }
};
</script>
<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff7f7; /* Color de fondo claro */
}

.product-image {
  width: 70px; /* Ancho ajustado */
  height: 120px; /* Altura ajustada */
}

.delete-link {
  color: red;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.delete-link:hover {
  text-decoration: underline;
}

.edit-link {
  color: blue;
  text-decoration: none;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.edit-link:hover {
  text-decoration: underline;
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
</style>
