<template>
  <v-container>
    <v-card
      :disabled="loading"
      :loading="loading"
      class="mx-auto my-12 custom-card"
      max-width="374"
    >
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>

      <div class="image-container" @click="openModal(product)">
        <v-icon
          v-if="product.imagenes.length > 1"
          @click.stop="previousImage"
          class="nav-arrow left-arrow"
        >
          mdi-chevron-left
        </v-icon>

        <v-img
          :src="getProductImage(product.imagenes, currentImageIndex)"
          height="350"
          cover
        ></v-img>

        <v-icon
          v-if="product.imagenes.length > 1"
          @click.stop="nextImage"
          class="nav-arrow right-arrow"
        >
          mdi-chevron-right
        </v-icon>
      </div>

      <v-card-item>
        <v-card-title>{{ product.nombre }}</v-card-title>
        <v-card-title>
          <div class="price-info">
            <span v-if="product.descuento > 0" class="discounted-price">
              {{ formatPrice(product.precio * (1 - product.descuento / 100)) }}
            </span>
            <span v-if="product.descuento > 0" class="original-price">
              {{ formatPrice(product.precio) }}
            </span>
            <span v-else>
              {{ formatPrice(product.precio) }}
            </span>
          </div>
        </v-card-title>
      </v-card-item>

      <v-card-item class="px-4 pb-4">
        <v-row>
          <v-col>
            <span>Colores disponibles:</span>
            <v-row>
              <v-col cols="auto" v-for="(color, index) in parseColors(product.colores)" :key="index">
                <v-chip
                  :class="['color-chip', { 'selected-chip': selectedColors[product.id] === color }]"
                  small
                  @click="selectColor(color)"
                  :style="{ backgroundColor: color }"
                ></v-chip>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-item>

      <v-divider class="mx-4 mb-1"></v-divider>

      <v-card-actions>
        <v-btn class="custom-btn" block border @click="addToCart(product)">
          Agregar al carrito
        </v-btn>
      </v-card-actions>

    </v-card>

    <v-dialog v-model="isModalOpen" max-width="900px">
      <v-card>
        <v-card-text class="modal-content">
          <div class="modal-image-container">
            <v-icon
              v-if="modalProduct?.imagenes.length > 1"
              @click.stop="previousImage"
              class="nav-arrow left-arrow"
            >
              mdi-chevron-left
            </v-icon>

            <v-img
              :src="getProductImage(modalProduct?.imagenes, currentImageIndex)"
              height="500"
              contain
              class="zoomable-image"
            ></v-img>

            <v-icon
              v-if="modalProduct?.imagenes.length > 1"
              @click.stop="nextImage"
              class="nav-arrow right-arrow"
            >
              mdi-chevron-right
            </v-icon>
          </div>

          <div class="product-info">
            <h3>{{ modalProduct?.nombre }}</h3>

            <div class="price-info">
              <span v-if="modalProduct?.descuento > 0" class="discounted-price">
                {{ formatPrice(modalProduct?.precio * (1 - modalProduct?.descuento / 100)) }}
              </span>
              <span v-if="modalProduct?.descuento > 0" class="original-price">
                {{ formatPrice(modalProduct?.precio) }}
              </span>
              <span v-else>
                {{ formatPrice(modalProduct?.precio) }}
              </span>
            </div>

            <div class="modal-colors">
              <span>Colores disponibles:</span>
              <v-row>
                <v-col cols="auto" v-for="(color, index) in parseColors(modalProduct?.colores)" :key="index">
                  <v-chip
                    :class="['color-chip', { 'selected-chip': selectedColors[modalProduct?.id] === color }]"
                    small
                    @click="selectColor(color)"
                    :style="{ backgroundColor: color }"
                  ></v-chip>
                </v-col>
              </v-row>
            </div>
          </div>

          <div class="add-to-cart-section">
            <div class="quantity-selector">
              <v-btn icon @click="decreaseQuantity">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <span>{{ quantity }}</span>
              <v-btn icon @click="increaseQuantity">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
            <v-btn class="custom-btn" @click="addToCart(modalProduct)">Agregar al carrito</v-btn>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" text @click="isModalOpen = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { agregarProductosAlCarrito } from "@/service/cartService.js";

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const selectedColors = ref({});
const currentImageIndex = ref(0);
const isModalOpen = ref(false);
const modalProduct = ref(null);
const quantity = ref(1);

const openModal = (product) => {
  modalProduct.value = product;
  isModalOpen.value = true;
};

function selectColor(color) {
  if (selectedColors.value[props.product.id] === color) {
    selectedColors.value[props.product.id] = null;
  } else {
    selectedColors.value[props.product.id] = color;
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace(",00", "");
};

const getProductImage = (imagenes, index) => {
  return (imagenes && imagenes.length > 0)
    ? `http://localhost:8080/images/${imagenes[index]}`
    : '/src/assets/img/libro.png';
};

const nextImage = () => {
  const totalImages = props.product.imagenes.length;
  currentImageIndex.value = (currentImageIndex.value + 1) % totalImages;
};

const previousImage = () => {
  const totalImages = props.product.imagenes.length;
  currentImageIndex.value = (currentImageIndex.value - 1 + totalImages) % totalImages;
};

const increaseQuantity = () => {
  if (quantity.value < 10) quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};

const parseColors = (colores) => {
  if (Array.isArray(colores)) {
    return colores.map(color => {
      switch (color.toLowerCase()) {
        case "rojo": return "#FF1744";
        case "azul": return "#2979FF";
        case "verde": return "#00E676";
        case "amarillo": return "#FFEA00";
        case "negro": return "#212121";
        case "blanco": return "#FAFAFA";
        case "morado": return "#9C27B0";
        case "naranja": return "#FF9800";
        case "gris": return "#BDBDBD";
        case "rosa": return "#E91E63";
        default: return "#BDBDBD";
      }
    });
  } else {
    console.error("Error: 'colores' no es un arreglo.", colores);
    return [];
  }
};

const addToCart = async (product) => {
  try {
    // Verifica que el producto tenga los valores correctos
    console.log("Producto:", product);
    
    // Calcular el precio basado en si hay descuento o no
    let finalPrice;
    if (product.descuento > 0) {
      finalPrice = product.precio * (1 - product.descuento / 100);
      console.log("Precio con descuento:", finalPrice);
    } else {
      finalPrice = product.precio;
      console.log("Precio normal:", finalPrice);
    }

    // Preparar el objeto que representa el producto y la cantidad seleccionada
    const productos = [
      {
        productoId: product.id,
        cantidad: quantity.value,
        precio: finalPrice
      },
    ];

    // Llamar al endpoint para agregar los productos al carrito
    const response = await agregarProductosAlCarrito(productos);
    console.log("Producto agregado al carrito:", response);
  } catch (error) {
    console.error("Error al agregar el producto al carrito:", error);
  }
};
</script>

<style scoped>
.custom-card {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
}

.custom-btn {
  background-color: #FAB400 !important;
  color: black !important;
}

.custom-btn:hover {
  background-color: #ffca28 !important;
}

.color-chip {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.selected-chip {
  border: 3px solid #000000;
}

.image-container, .modal-image-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 30px;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  padding: 8px;
  z-index: 1;
}

.left-arrow {
  left: 10px;
}

.right-arrow {
  right: 10px;
}

.product-info h3 {
  font-size: 1.8rem;
  font-weight: bold;
}

.product-info p {
  font-size: 1.4rem;
}

.product-info span {
  font-size: 1.2rem;
}

.modal-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 32px;
}

.modal-image-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 8px;
}

.custom-btn {
  padding: 12px 24px;
  font-size: 1rem;
  width: 100%;
}

.add-to-cart-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  margin-top: 16px;
}

.price-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.discounted-price {
  font-weight: bold;
  font-size: 1.3rem;
  color: black;
}

.original-price {
  font-size: 1.1rem;
  color: grey;
  text-decoration: line-through;
}
</style>
