<template>
  <h2 class="title">Direcciones</h2>
  <v-card class="mx-auto pa-5 main-card" max-width="1300">
    <v-container class="scroll-container" fluid>
      <v-row>
        <v-col
          v-for="(direccion, index) in uniqueDirecciones"
          :key="direccion.id"
          cols="12"
          md="6"
          lg="4"
          xl="3"
          class="mb-4"
        >
          <CardAddress :direccion="direccion" :direccionNumero="index + 1" />
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions class="btn">
      <v-btn text color="#486594" @click="openAddDialog">
        Añadir nueva dirección
        <v-icon right size="30">mdi-plus</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
  
  <!-- Modal para añadir una nueva dirección -->
  <v-dialog v-model="isAddDialogOpen" max-width="600px">
    <v-card rounded="xl">
      <v-card-title class="headline">Añadir Nueva Dirección</v-card-title>
      <v-card-text>
        <v-form ref="addForm">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="newAddress.pais"
                rounded="lg"
                label="País"
                outlined
                :error-messages="showValidationErrors && !newAddress.pais ? ['Campo requerido'] : []"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="newAddress.departamento"
                rounded="lg"
                label="Departamento"
                outlined
                :error-messages="showValidationErrors && !newAddress.departamento ? ['Campo requerido'] : []"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="newAddress.ciudad"
                rounded="lg"
                label="Ciudad"
                outlined
                :error-messages="showValidationErrors && !newAddress.ciudad ? ['Campo requerido'] : []"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="newAddress.codigoPostal"
                rounded="lg"
                label="Código postal"
                placeholder="Opcional"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newAddress.calle"
                rounded="lg"
                label="Dirección"
                outlined
                :error-messages="showValidationErrors && !newAddress.calle ? ['Campo requerido'] : []"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newAddress.barrio"
                rounded="lg"
                label="Barrio"
                outlined
                :error-messages="showValidationErrors && !newAddress.barrio ? ['Campo requerido'] : []"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="newAddress.destinatario"
                rounded="lg"
                label="Destinatario"
                outlined
                :error-messages="showValidationErrors && !newAddress.destinatario ? ['Campo requerido'] : []"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="isAddDialogOpen = false">Cerrar</v-btn>
        <v-btn color="#486594" @click="addNewAddress">Añadir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import CardAddress from "./CardAddress.vue";
import { obtenerDireccionesPorUsuario, crearDireccion } from '../../../../service/addresService.js';

const direcciones = ref([]);
const isAddDialogOpen = ref(false);
const showValidationErrors = ref(false); // Estado para controlar la visualización de errores
const newAddress = ref({
  pais: "Colombia",
  departamento: "Tolima",
  ciudad: "Ibagué",
  codigoPostal: "",
  calle: "",
  barrio: "",
  destinatario: ""
});

// Computed para direcciones únicas
const uniqueDirecciones = computed(() => {
  return [...new Map(direcciones.value.map((item) => [item.id, item])).values()];
});

// Cargar direcciones
const cargarDirecciones = async () => {
  try {
    const response = await obtenerDireccionesPorUsuario();
    direcciones.value = response;
  } catch (error) {
    console.error("Error al cargar direcciones:", error);
  }
};

// Abrir modal para añadir nueva dirección
const openAddDialog = () => {
  isAddDialogOpen.value = true;
  showValidationErrors.value = false; // Restablecer los errores de validación
};

// Validar si todos los campos obligatorios están llenos
const isValidAddress = (address) => {
  return (
    address.pais &&
    address.departamento &&
    address.ciudad &&
    address.calle &&
    address.barrio &&
    address.destinatario
  );
};

// Añadir nueva dirección
const addNewAddress = async () => {
  showValidationErrors.value = true; // Mostrar los errores si faltan campos
  if (!isValidAddress(newAddress.value)) {
    return;
  }
  
  try {
    await crearDireccion(newAddress.value);
    await cargarDirecciones(); // Recargar direcciones después de añadir
    isAddDialogOpen.value = false; // Cerrar el modal
    resetNewAddressForm();
  } catch (error) {
    console.error("Error al añadir dirección:", error);
  }
};

// Resetear formulario de nueva dirección
const resetNewAddressForm = () => {
  newAddress.value = { pais: "Colombia", departamento: "Tolima", ciudad: "Ibagué", codigoPostal: "", calle: "", barrio: "", destinatario: "" };
};

onMounted(cargarDirecciones);
</script>

<style scoped>
.headline { color: #fab400; }
.main-card { max-height: 609px; max-width: 1200px; overflow-y: auto; margin: 0 auto; padding: 20px; border: 2px solid #12223d; margin-right: 20px; }
.title { font-size: 60px; color: #fab400; margin-left: 70px; }
.btn { margin-top: 50px; margin-left: 1020px; }
</style>
