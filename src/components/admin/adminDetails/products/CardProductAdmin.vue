<template>
    <v-card class="pa-3 my-4 product-card">
      <v-row>
        <!-- Imagen del producto -->
        <v-col cols="2" class="d-flex align-center justify-center">
          <img src="/src/assets/img/buso.jpg" alt="Buso" class="product-image" />
        </v-col>
  
        <!-- Información del producto -->
        <v-col cols="8">
          <v-row>
            <v-col cols="12" md="2"><strong>Nombre del producto</strong><br />Buso</v-col>
            <v-col cols="12" md="2"><strong>Precio</strong><br />$ 34.900</v-col>
            <v-col cols="12" md="2"><strong>Tamaño</strong><br />800ML</v-col>
            <v-col cols="12" md="2"><strong>Colores</strong><br />Blanco, Negro</v-col>
            <v-col cols="12" md="2"><strong>Stock</strong><br />10</v-col>
            <v-col cols="12" md="2"><strong>Descuento</strong><br />No aplica</v-col>
          </v-row>
        </v-col>
  
        <!-- Botones de acción con íconos -->
        <v-col cols="2" class="d-flex flex-column align-end justify-center">
          <a href="#" class="delete-link">
            <v-icon left color="red">mdi-delete</v-icon> Eliminar
          </a>
          <a href="#" class="edit-link" @click.prevent="openDialog">
            <v-icon left color="blue">mdi-pencil</v-icon> Editar
          </a>
        </v-col>
      </v-row>
    </v-card>
  
    <!-- Modal de tamaño XL -->
    <v-dialog v-model="isDialogOpen" max-width="900px">
      <v-card rounded="xl">
        <v-card-title>
          <span class="headline">Editar Producto</span>
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
                    :items="Array.from({ length: 100 }, (_, i) => (i + 1).toString())"
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
          <v-btn color="#486594" @click="saveProduct">Guardar producto</v-btn>
          <v-btn color="red">Eliminar</v-btn>
          <v-btn text @click="closeDialog">Volver</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Variables reactivas para manejar el estado del modal y la imagen seleccionada
  const isDialogOpen = ref(false); 
  const selectedImage = ref(null);
  const fileInput = ref(null);
  
  // Función para abrir el modal
  const openDialog = () => {
    isDialogOpen.value = true;
    console.log("Dialogo abierto", isDialogOpen.value);
  };
  
  // Función para cerrar el modal
  const closeDialog = () => {
    isDialogOpen.value = false;
    console.log("Dialogo cerrado", isDialogOpen.value);
  };
  
  // Función para guardar el producto
  const saveProduct = () => {
    console.log("Producto guardado");
    closeDialog(); // Cierra el modal después de guardar el producto
  };
  
  // Función para abrir el selector de archivos
  const triggerFileInput = () => {
    fileInput.value.click(); // Dispara la selección de archivo
  };
  
  // Función para manejar el cambio de imagen
  const onFileChange = (event) => {
    const file = event.target.files[0];
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
  