<template>
  <v-card class="pa-3 card-address" max-width="400px">
    <v-card-title class="justify-space-between">
      <div color="#0F1F39">Dirección {{ direccionNumero }}</div>
    </v-card-title>
    <v-card-text class="text-card">
      {{ direccion.calle }}<br />
      {{ direccion.barrio }}<br />
      {{ direccion.ciudad }}, {{ direccion.departamento }}<br />
      {{ direccion.pais }}<br />
      Código postal: {{ direccion.codigoPostal }}
    </v-card-text>
    <v-card-actions class="btn">
      <v-btn text color="#486594" @click="openDialog">
        Editar
        <v-icon right size="30">mdi-pencil</v-icon>
      </v-btn>
    </v-card-actions>

    <!-- Modal para editar dirección -->
    <v-dialog v-model="isDialogOpen" max-width="600px">
      <v-card rounded="xl">
        <v-card-title class="headline">Editar Dirección</v-card-title>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="direccionEditable.pais"
                  rounded="lg"
                  label="País"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="direccionEditable.departamento"
                  rounded="lg"
                  label="Departamento"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="direccionEditable.ciudad"
                  rounded="lg"
                  label="Ciudad"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="direccionEditable.codigoPostal"
                  rounded="lg"
                  label="Código postal"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="direccionEditable.calle"
                  rounded="lg"
                  label="Dirección"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="direccionEditable.barrio"
                  rounded="lg"
                  label="Barrio"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="direccionEditable.destinatario"
                  rounded="lg"
                  label="Destinatario"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="isDialogOpen = false">Cerrar</v-btn>
          <v-btn color="#486594" @click="saveAddress">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref } from 'vue';
import { editarDireccion } from '../../../../service/addresService.js';

const props = defineProps({
  direccion: Object,
  direccionNumero: Number  // Agrega esta prop
});


const emit = defineEmits(["refreshAddresses"]);

const isDialogOpen = ref(false);
const direccionEditable = ref({ ...props.direccion });

// Abrir modal de edición
const openDialog = () => {
  direccionEditable.value = { ...props.direccion };
  isDialogOpen.value = true;
};

// Guardar cambios en dirección
const saveAddress = async () => {
  try {
    await editarDireccion(direccionEditable.value.id, direccionEditable.value);
    emit("refreshAddresses");
    isDialogOpen.value = false;
  } catch (error) {
    console.error("Error al guardar dirección:", error);
  }
};
</script>

<style scoped>
.headline { color: #fab400; }
.card-address { border: 2px solid #979797; margin-bottom: 10px; }
.text-card { color: #486594; }
.btn { margin-top: -20px; margin-left: 140px; }
</style>
