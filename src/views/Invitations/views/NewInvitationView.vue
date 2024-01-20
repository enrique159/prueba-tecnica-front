<template>
  <div class="new-invitation-view">
    <v-container class="pt-12 h-100">
      <v-row>
        <h1>Nueva invitación</h1>
      </v-row>

      <div class="new-invitation">
        <v-form class="pt-8" v-model="valid" @submit.prevent="validate">
          <h2>Crea una nueva invitación</h2>
          <p class="text-grey-darken-1 mb-8">Para ingresar a la plataforma</p>

          <v-text-field
            class="mb-2"
            v-model="guestName"
            :rules="guestNameRules"
            :prepend-inner-icon="IconUser"
            variant="outlined"
            label="Nombre del invitado"
            required
          ></v-text-field>

          <v-row>
            <v-col cols="6">
              <v-text-field
                class="mb-2"
                v-model="date"
                type="date"
                :rules="dateRules"
                :prepend-inner-icon="IconCalendar"
                variant="outlined"
                label="Fecha"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                class="mb-2"
                v-model="hour"
                :items="hoursOptions"
                :rules="hourRules"
                :prepend-inner-icon="IconClock"
                variant="outlined"
                label="Hora"
                required
              >
              </v-select>
            </v-col>
          </v-row>

          <v-text-field
            class="mb-2"
            type="date"
            v-model="caducity"
            :rules="caducityRules"
            :prepend-inner-icon="IconCalendar"
            variant="outlined"
            label="Caducidad"
            required
          ></v-text-field>

          <v-btn type="submit" :prepend-icon="IconCirclePlus" color="#771BE9" :disabled="!validateFiels" :loading="loading" block variant="tonal" class="py-6">
            Crear invitación
          </v-btn>
        </v-form>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { IconUser, IconCalendar, IconClock, IconCirclePlus } from "@tabler/icons-vue";
import { useAppStore } from "@/stores/appStore";
import { useRouter } from "vue-router";
import { useNotifications } from "@/composables/useNotifications";
import { hoursOptions } from "@/app/shared/constants/hoursOptions"
import Exception from "@/app/shared/error/Exception";
import ErrorCodes from "@/app/shared/error/ErrorCodes";

const valid = ref(false);
const loading = ref(false);

const guestName = ref("");
const date = ref("");
const hour = ref("09:00");
const caducity = ref("");

const guestNameRules = [
  (v: string) => !!v || "El nombre del invitado es requerido",
]

const dateRules = [
  (v: string) => !!v || "La fecha es requerida",
  (v: string) => {
    const date = new Date(v);
    const today = new Date();
    return date >= today || "La fecha debe ser mayor o igual a hoy";
  },
]

const hourRules = [
  (v: string) => !!v || "La hora es requerida",
]

const caducityRules = [
  (v: string) => !!v || "La caducidad es requerida",
  (v: string) => {
    const date = new Date(v);
    const today = new Date();
    return date >= today || "La caducidad debe ser mayor o igual a hoy";
  },
  // add a rule that the caducity must be greater than the date
  (v: string) => {
    const dateCaducity = new Date(v);
    const caducity = new Date(dateCaducity.getFullYear(), dateCaducity.getMonth(), dateCaducity.getDate(), 23, 59, 59);
    const dateToCompare = new Date(`${date.value} ${hour.value}`);
    return caducity <= dateToCompare || "La caducidad debe ser menor o igual a la fecha de la invitación";
  },
]


const validateFiels = computed(() => {
  const validGuestName = guestNameRules.every((rule) => rule(guestName.value) === true);
  const validDate = dateRules.every((rule) => rule(date.value) === true);
  const validHour = hourRules.every((rule) => rule(hour.value) === true);
  const validCaducity = caducityRules.every((rule) => rule(caducity.value) === true);
  return validGuestName && validDate && validHour && validCaducity;
})

const { createInvitation } = useAppStore();
const { notifyError } = useNotifications();
const router = useRouter();


const validate = async() => {
  if (valid.value) {
    loading.value = true;
    const dateToConvert = new Date(date.value);
    const formattedDate = dateToConvert.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

    const invitation = {
      guestName: guestName.value,
      date: formattedDate,
      hour: hour.value,
      caducity: caducity.value,
    };

    await createInvitation(invitation)
      .then(() => {
        router.push({ name: 'Invitations' })
      })
      .catch((error) => {
        if (error instanceof Exception) {
          for (let err of error.errors) {
            if (err.code === ErrorCodes.ERR0000.code)
              notifyError('Ocurrió un error al crear la invitación, favor de intentarlo de nuevo.')
            else
              notifyError(err.description)
          }
        } else {
          notifyError('Ocurrió un error al crear la invitación, favor de intentarlo de nuevo.')
        }
      })
      .finally(() => {
        loading.value = false;
      })
  }
};
</script>

<style lang="scss" scoped>
.new-invitation-view {
  width: 100%;
  height: 100dvh;

  .new-invitation {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
  }
}
</style>