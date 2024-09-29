<template >
  <v-container class="d-flex flex-column align-center justify-center"> 
    <v-row>
      <v-col>
        <div></div>
      </v-col>
      <v-col>
        <div class="d-flex justify-center">
          <h2 style="color: #0f1f39">Mi carrito</h2>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <!-- Columna izquierda -->
      <v-col cols="12" md="6">
        <!-- Cards a la izquierda -->
        <CardInfo />
        <CardSend class="mt-4 mb-4" />
        <CardPay  />
      </v-col>

      <!-- Columna derecha -->
      <v-col cols="12" md="6">

         <!-- Scroll para el CardProduct sin scroll horizontal -->
        <div style="max-height: 300px; overflow-y: auto; overflow-x: hidden; border: 1px solid #797575; padding: 10px;">
          <v-row no-gutters>
            <v-col cols="12" md="6" v-for="(product, index) in cartProducts" :key="index">
              <CardProduct class="ml-8 mb-4" />
            </v-col>
          </v-row>
        </div>

         <!-- Texto con fondo gris centrado -->
         <v-row class="">
          <v-col cols="12" class="d-flex justify-center">
            <p
              style="background-color: #d9d9d9; padding: 10px; border-radius: 4px; margin-top: 20px; margin-bottom: 0; text-align: center;"
            >
              El precio indicado es por unidad del producto;<br> el total de tu compra
              se mostrará<br> en el siguiente resumen.
            </p>
          </v-col>
        </v-row>

        <!-- Card del total centrado sin cambiar su tamaño -->
        <v-row class="mt-12 d-flex justify-center">
          <div style="width: 300px;">
            <CardTotal />
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import CardInfo from "@/components/cart/CardInfo.vue";
import CardSend from "@/components/cart/CardSend.vue";
import CardPay from "@/components/cart/CardPay.vue";
import CardProduct from "@/components/cart/CardProduct.vue";
import CardTotal from "@/components/cart/CardTotal.vue";

// Simulación de productos en el carrito
const cartProducts = [
  { name: "Producto 1" },
  { name: "Producto 2" },
  { name: "Producto 3" },
  { name: "Producto 4" },
  { name: "Producto 5" },
];
</script>

<style scoped>
h2 {
  font-size: 2rem;
  font-weight: bold;
}
</style>
