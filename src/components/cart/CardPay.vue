<template>
  <v-card outlined class="pa-4" style="border: 1px solid #797575;">
    <v-row align="center" justify="space-between">
      <v-col cols="auto" class="d-flex align-center">
        <v-avatar color="#0F1F39" size="32" class="mr-2">
          <span class="white--text">3</span>
        </v-avatar>
        <span class="headline font-weight-bold" style="color: #0F1F39;">Pago</span>
      </v-col>
    </v-row>

    <v-row class="mt-5">
      <v-col cols="6">
        <v-btn 
          :class="selectedPayment === 'debito' ? 'selected-payment' : ''"
          outlined class="mb-2 d-flex justify-space-between" 
          style="width: 100%; min-width: 300px;"
          @click="selectPayment('debito')"
        >
          <span>Tarjeta de débito</span>
          <div class="d-flex">
            <v-img src="/src/assets/img/Visa.svg" width="30" height="20" class="mr-2"></v-img>
            <v-img src="/src/assets/img/Mastercard.svg" width="30" height="20"></v-img>
          </div>
        </v-btn>

        <v-btn 
          :class="selectedPayment === 'credito' ? 'selected-payment' : ''"
          outlined class="mb-2 d-flex justify-space-between" 
          style="width: 100%; min-width: 300px;"
          @click="selectPayment('credito')"
        >
          <span>Tarjeta de crédito</span>
          <div class="d-flex">
            <v-img src="/src/assets/img/Visa.svg" width="30" height="20" class="mr-2"></v-img>
            <v-img src="/src/assets/img/Mastercard.svg" width="30" height="20"></v-img>
          </div>
        </v-btn>

        <v-btn 
          :class="selectedPayment === 'pse' ? 'selected-payment' : ''"
          outlined class="mb-2 d-flex justify-space-between" 
          style="width: 100%; min-width: 300px;"
          @click="selectPayment('pse')"
        >
          <span>PSE</span>
          <v-img src="/src/assets/img/pse.png" width="30" height="30"></v-img>
        </v-btn>

        <v-btn 
          :class="selectedPayment === 'ganagana' ? 'selected-payment' : ''"
          outlined class="mb-2 d-flex justify-space-between" 
          style="width: 100%; min-width: 300px;"
          @click="selectGanagana"
        >
          <span>Gana Gana</span>
          <v-img src="/src/assets/img/ganagana.png" width="30" height="30"></v-img>
        </v-btn>

        <v-btn 
          :class="selectedPayment === 'reserva' ? 'selected-payment' : ''"
          outlined class="d-flex justify-space-between" 
          style="width: 100%; min-width: 300px;"
          @click="selectPayment('reserva')"
        >
          <span>Reserva</span>
          <v-img src="/src/assets/img/reserva.png" width="30" height="30"></v-img>
        </v-btn>
      </v-col>

      <v-col cols="6">
        <div v-if="selectedPayment === 'debito' || selectedPayment === 'credito'">
          <v-btn 
            v-for="(tarjeta, index) in tarjetasFiltradas"
            :key="index"
            outlined class="mb-2 d-flex justify-space-between"
            :class="{ 'selected-card': selectedCardIndex === index }"
            style="width: 100%; min-width: 300px;"
            @click="selectCard(index)"
          >
            <div class="d-flex align-center">
              <v-img :src="getCardIcon(tarjeta.numeroTarjeta)" width="30" height="20" class="mr-2"></v-img>
              <div>
                <div>{{ maskedCardNumber(tarjeta.numeroTarjeta) }}</div>
                <div>{{ tarjeta.fechaExpiracion }}</div>
              </div>
            </div>
          </v-btn>

          <v-btn outlined class="d-flex justify-space-between" style="width: 100%; min-width: 300px;" @click="openAddDialog">
            <div class="d-flex align-center">
              <v-icon left>mdi-credit-card-plus-outline</v-icon>
              <span>Agregar tarjeta</span>
            </div>
          </v-btn>
        </div>

        <div v-if="selectedPayment === 'ganagana'" class="info-box mt-4">
          <span>Se generará tu factura una vez efectuada la orden.</span>
        </div>

        <div v-if="selectedPayment === 'pse'" class="mt-4">
          <v-select
            :items="banks"
            label="Selecciona tu banco"
            v-model="selectedBank"
            outlined
            style="width: 100%;"
          ></v-select>
        </div>

        <div v-if="selectedPayment === 'reserva'" class="info-box mt-4">
          <span>Tendrás 3 días hábiles para reclamar tu pedido mostrando tu número de pedido en la tienda universitaria.</span>
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="isAddDialogOpen" max-width="600px">
      <v-card rounded="xl">
        <v-card-title class="headline"> Añadir Método de Pago </v-card-title>
        <v-card-subtitle color="#051024">Ingresar una tarjeta de débito o crédito</v-card-subtitle>

        <v-card-text>
          <v-form>
            <v-text-field 
              v-model="formattedCardNumber"
              @input="formatCardNumber"
              rounded="lg" 
              label="Número de tarjeta" 
              placeholder="xxxx xxxx xxxx xxxx" 
              outlined
              maxlength="19"
              :error-messages="numeroTarjetaError"
            >
              <template v-slot:prepend-inner>
                <v-img v-if="cardIcon" :src="cardIcon" width="30" height="20" style="margin-right: 8px;" />
              </template>
            </v-text-field>
            
            <v-text-field 
              v-model="nombreTitular" 
              rounded="lg" 
              label="Nombre del titular" 
              placeholder="abcd efghi" 
              outlined
              :error-messages="nombreTitularError"
            ></v-text-field>

            <v-radio-group v-model="cardType" row class="mt-4" label="Tipo de tarjeta" :mandatory="true">
              <v-radio label="Crédito" value="CREDITO"></v-radio>
              <v-radio label="Débito" value="DEBITO"></v-radio>
            </v-radio-group>

            <h4 color="#051024">Fecha de vencimiento</h4>
            <v-row>
              <v-col cols="4">
                <v-select
                  :items="months"
                  label="Mes"
                  v-model="selectedMonth"
                  outlined
                  rounded="lg"
                  :error-messages="selectedMonthError"
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-select
                  :items="years"
                  label="Año"
                  v-model="selectedYear"
                  outlined
                  rounded="lg"
                  :error-messages="selectedYearError"
                ></v-select>
              </v-col>
            </v-row>
            
            <v-text-field 
              v-model="cvv" 
              rounded="lg" 
              label="CVV" 
              placeholder="xxx" 
              outlined
              maxlength="3"
              type="number"
              :error-messages="cvvError"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="isAddDialogOpen = false">Cerrar</v-btn>
          <v-btn color="#486594" @click="savePaymentMethod">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { guardarTarjeta, obtenerTarjetasUsuario } from '../../service/cardService.js';

const selectedPayment = ref(null);
const isAddDialogOpen = ref(false);
const selectedBank = ref(null);
const selectedCardIndex = ref(null);
const cardType = ref("CREDITO");
const formattedCardNumber = ref(""); 
const numeroTarjeta = ref("");
const nombreTitular = ref("");
const selectedMonth = ref(null);
const selectedYear = ref(null);
const cvv = ref("");
const errorMessage = ref("");
const tarjetasUsuario = ref([]);
const tarjetasFiltradas = ref([]);

const numeroTarjetaError = ref("");
const nombreTitularError = ref("");
const selectedMonthError = ref("");
const selectedYearError = ref("");
const cvvError = ref("");

const banks = [
  "Banco de Bogotá",
  "Banco Popular",
  "Banco CorpBanca",
  "Bancolombia",
  "Davivienda",
  "Banco AV Villas"
];

const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 20 }, (_, i) => (currentYear + i).toString());

const cardIcon = computed(() => {
  if (numeroTarjeta.value.startsWith("4")) {
    return "/src/assets/img/Visa.svg";
  } else if (numeroTarjeta.value.startsWith("5")) {
    return "/src/assets/img/Mastercard.svg";
  }
  return "";
});

onMounted(async () => {
  await cargarTarjetasUsuario();
});

const cargarTarjetasUsuario = async () => {
  try {
    const tarjetas = await obtenerTarjetasUsuario();
    tarjetasUsuario.value = tarjetas;
    filtrarTarjetas();
  } catch (error) {
    console.error("Error al cargar tarjetas del usuario:", error);
  }
};

const validateFields = () => {
  numeroTarjetaError.value = numeroTarjeta.value ? "" : "Debes rellenar este campo";
  nombreTitularError.value = nombreTitular.value ? "" : "Debes rellenar este campo";
  selectedMonthError.value = selectedMonth.value ? "" : "Debes seleccionar un mes";
  selectedYearError.value = selectedYear.value ? "" : "Debes seleccionar un año";
  cvvError.value = cvv.value ? "" : "Debes rellenar este campo";
  return !numeroTarjetaError.value && !nombreTitularError.value && !selectedMonthError.value && !selectedYearError.value && !cvvError.value;
};

const selectCard = (index) => {
  selectedCardIndex.value = index;
  const tarjetaSeleccionada = tarjetasUsuario.value[index];
  emit('update-tarjeta-seleccionada', tarjetaSeleccionada);
};

const formatCardNumber = () => {
  numeroTarjeta.value = formattedCardNumber.value.replace(/\s+/g, '');
  numeroTarjeta.value = numeroTarjeta.value.slice(0, 16);
  formattedCardNumber.value = numeroTarjeta.value.replace(/(\d{4})(?=\d)/g, '$1 ');
};

const selectPayment = (payment) => {
  selectedPayment.value = payment;
  filtrarTarjetas(); 
  emit('update-metodo-pago', payment);
};

const selectGanagana = () => {
  selectedPayment.value = 'ganagana';
  emit('update-metodo-pago', 'ganagana');
  emit('ganagana-selected');
};

const filtrarTarjetas = () => {
  tarjetasFiltradas.value = tarjetasUsuario.value.filter(tarjeta => {
    return (selectedPayment.value === 'debito' && tarjeta.tipoTarjeta === 'DEBITO') ||
           (selectedPayment.value === 'credito' && tarjeta.tipoTarjeta === 'CREDITO');
  });
};

const maskedCardNumber = (numero) => {
  return `****${numero.slice(-4)}`;
};

const getCardIcon = (numero) => {
  if (numero.startsWith("4")) {
    return "/src/assets/img/Visa.svg";
  } else if (numero.startsWith("5")) {
    return "/src/assets/img/Mastercard.svg";
  }
  return "";
};

const openAddDialog = () => {
  isAddDialogOpen.value = true;
};

const savePaymentMethod = async () => {
  if (!validateFields()) return;

  const tarjetaRequest = {
    numeroTarjeta: numeroTarjeta.value,
    nombreTitular: nombreTitular.value,
    tipoTarjeta: cardType.value,
    fechaExpiracion: `${selectedMonth.value}/${selectedYear.value}`,
    cvv: cvv.value
  };

  try {
    await guardarTarjeta(tarjetaRequest);
    isAddDialogOpen.value = false;
    resetForm();
    await cargarTarjetasUsuario();
  } catch (error) {
    console.error("Error al guardar tarjeta:", error);
    errorMessage.value = "Hubo un problema al guardar la tarjeta.";
  }
};

const resetForm = () => {
  formattedCardNumber.value = "";
  numeroTarjeta.value = "";
  nombreTitular.value = "";
  selectedMonth.value = null;
  selectedYear.value = null;
  cvv.value = "";
};
const emit = defineEmits(['update-metodo-pago', 'update-tarjeta-seleccionada', 'ganagana-selected']);
</script>

<style scoped>
.headline {
  color: #fab400;
}

.error-message {
  color: red;
}

.selected-payment {
  background-color: #0F1F39 !important;
  border-color: #fab400 !important;
  color: white !important;
}

.selected-card {
  background-color: #0F1F39 !important;
  border: 2px solid #0F1F39 !important;
}

.info-box {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
}
</style>
