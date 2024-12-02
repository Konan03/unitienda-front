<template>
  <v-card class="pa-4 main-card" max-width="400px">
    <v-card-title class="justify-space-between">
       <div style="font-size: 1.1rem;">
        {{ cardType }} **** {{ payment.numeroTarjeta.slice(-4) }}
      </div>
    </v-card-title>
    <v-card-text>
      <div>{{ payment.nombreTitular || 'N/A' }}</div>
      <div>Expira: {{ formattedExpirationDate }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="#486594" @click="openEditDialog">
        Editar
        <v-icon right>mdi-pencil</v-icon>
      </v-btn>
    </v-card-actions>

    <!-- Modal para editar tarjeta -->
    <v-dialog v-model="isEditDialogOpen" max-width="600px">
      <v-card>
        <v-card-title>Editar método de pago</v-card-title>
        <v-card-subtitle>Ingresar una tarjeta de débito o crédito</v-card-subtitle>
        <v-card-text>
          <v-form>
            <v-text-field label="Número de tarjeta" maxlength=""
              v-model="editableTarjeta.numeroTarjeta"
              outlined
      
              @input="formatCardNumber"
              
            >
              <template v-slot:prepend-inner>
                <img v-if="cardIcon" :src="cardIcon" alt="Card Icon" style="width: auto; height: 24px; object-fit: contain;" />
              </template>
            </v-text-field>
            <v-text-field
              label="Nombre del titular"
              v-model="editableTarjeta.nombreTitular"
              outlined
            ></v-text-field>

            <h4>Fecha de vencimiento</h4>
            <v-row>
              <v-col cols="6">
                <v-select
                  :items="months"
                  label="Mes"
                  v-model="selectedMonth"
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-select
                  :items="years"
                  label="Año"
                  v-model="selectedYear"
                  outlined
                ></v-select>
              </v-col>
            </v-row>

            <v-radio-group v-model="editableTarjeta.tipoTarjeta" row>
              <v-radio label="Crédito" value="CREDITO"></v-radio>
              <v-radio label="Débito" value="DEBITO"></v-radio>
            </v-radio-group>

            <v-text-field
              label="CVV"
              v-model="cvv"
              :type="cvvInputType"
              @focus="cvvInputType = 'text'"
              @blur="cvvInputType = 'password'"
              outlined
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="closeEditDialog">Cerrar</v-btn>
          <v-btn color="#486594" @click="updateCard">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue';
import { actualizarTarjeta } from '../../../../service/cardService.js';

const props = defineProps({
  payment: {
    type: Object,
    required: true
  }
});
const emit = defineEmits(["updated"]); // Emitir evento al componente padre

// Estados del componente
const isEditDialogOpen = ref(false);
const editableTarjeta = ref({ ...props.payment });
const cvv = ref("***");
const cvvInputType = ref("password");

// Formato para la fecha de expiración
const formattedExpirationDate = computed(() => {
  return props.payment.fechaExpiracionDb
    ? `${props.payment.fechaExpiracionDb.slice(5, 7)}/${props.payment.fechaExpiracionDb.slice(0, 4)}`
    : "N/A";
});

// Obtener el tipo de tarjeta (Visa o Mastercard) basándonos en el número de tarjeta
const cardType = computed(() => {
  if (props.payment && props.payment.numeroTarjeta) {
    const firstDigit = props.payment.numeroTarjeta[0];
    return firstDigit === "4" ? "Visa" : firstDigit === "5" ? "MasterCard" : "Desconocido";
  }
  return "Desconocido";
});

// Obtener el icono de tarjeta según el tipo
import visaIcon from '/src/assets/visaIcon.png';
import mastercardIcon from '/src/assets/mastercardIcon.png';

const cardIcon = computed(() => {
  if (editableTarjeta.value.numeroTarjeta.startsWith("4")) {
    return visaIcon;
  } else if (editableTarjeta.value.numeroTarjeta.startsWith("5")) {
    return mastercardIcon;
  } else {
    return '';
  }
});

// Meses y años para los selectores
const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => (currentYear + i).toString());

const selectedMonth = ref(props.payment.fechaExpiracionDb ? props.payment.fechaExpiracionDb.slice(5, 7) : null);
const selectedYear = ref(props.payment.fechaExpiracionDb ? props.payment.fechaExpiracionDb.slice(0, 4) : null);

// Formatear el número de tarjeta al escribir en el campo
const formatCardNumber = () => {
  editableTarjeta.value.numeroTarjeta = editableTarjeta.value.numeroTarjeta
    .replace(/\D/g, '') // Eliminar cualquier carácter no numérico
    .replace(/(.{4})/g, '$1 ') // Insertar un espacio cada cuatro dígitos
    .trim(); // Eliminar cualquier espacio adicional al final
};

// Abrir y cerrar el modal
const openEditDialog = () => {
  editableTarjeta.value = { ...props.payment };
  isEditDialogOpen.value = true;
};
const closeEditDialog = () => {
  isEditDialogOpen.value = false;
};

// Función para actualizar la tarjeta y emitir el cambio al componente padre
const updateCard = async () => {
  try {
    editableTarjeta.value.fechaExpiracion = `${selectedMonth.value}/${selectedYear.value}`;
    await actualizarTarjeta(editableTarjeta.value.id, editableTarjeta.value);
    emit("updated"); // Emitir evento al componente padre para recargar datos
    isEditDialogOpen.value = false;
  } catch (error) {
    console.error("Error al actualizar la tarjeta:", error);
  }
};
</script>

<style scoped>
.main-card {
  border: 1px solid #979797;
  border-radius: 8px;
}
</style>
