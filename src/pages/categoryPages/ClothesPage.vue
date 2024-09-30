<template>
    <v-container>
       <v-row>
     <v-col class="d-flex align-center">
       <h1>Termos</h1>
     </v-col>
   </v-row>

   <v-row class="d-flex justify-space-between">
     <v-col cols="auto">
       <v-btn variant="outlined">
         <v-icon left>mdi-filter</v-icon>
         Ver filtros
       </v-btn>

       <v-btn variant="outlined" class="ml-4">
         Ordenar por
         <v-icon right>mdi-chevron-down</v-icon>
       </v-btn>
     </v-col>
   </v-row>

   
   <v-row>
   <v-col cols="12" md="3" v-for="n in 4" :key="n">
       <CardClothesCategory/>
   </v-col>
 </v-row>


 </v-container>

</template>

<script setup>
import CardClothesCategory from '@/components/cardsCategory/CardClothesCategory.vue';
</script>

<style>
</style>