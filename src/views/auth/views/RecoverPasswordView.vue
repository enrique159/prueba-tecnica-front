<template>
  <div class="recover-password-view">
    <div class="recover-password-content">
      <h1>Recupera tu contraseña</h1>
      <p>Primero, escribe el correo electrónico asociado a tu cuenta.</p>
      <v-row>
        <v-col cols="12" sm="7">
          <v-form class="pt-8" v-model="valid" @submit.prevent="validate">
            <v-text-field
              class="mb-2"
              v-model="email"
              :rules="emailRules"
              :prepend-inner-icon="IconMail"
              variant="outlined"
              label="Correo electrónico"
              required
            ></v-text-field>

            <p v-if="emailSent" class="text-body-2 text-gray-darken-1">
              Se ha enviado un correo electrónico con las instrucciones para recuperar tu contraseña. Deberás revisar tu bandeja de SPAM en caso de no encontrarlo en tu bandeja de entrada.
              Si no te ha llegado el correo electrónico, favor de intentarlo de nuevo en unos segundos más.
            </p>

            <v-btn type="submit" color="#771BE9" :loading="loading" variant="tonal" block class="mt-2 mb-8 py-6">
              Enviar correo
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconMail } from '@tabler/icons-vue'
import { ref } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { useNotifications } from '@/composables/useNotifications';
import Exception from '@/app/shared/error/Exception';
import ErrorCodes from '@/app/shared/error/ErrorCodes';

const valid = ref(false)
const email = ref('')
const loading = ref(false)
const emailSent = ref(false)

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


const emailRules = [
  (v: string) => !!v || 'El correo electrónico es requerido',
  (v: string) => regexEmail.test(v) || 'El correo electrónico debe ser válido',
]

const { recoverPassword } = useAppStore()
const { notify, notifyError } = useNotifications()

const validate = async() => {
  if (!valid.value) return
  loading.value = true
  emailSent.value = false

  await recoverPassword(email.value)
    .then(() => {
      emailSent.value = true
      notify({ message: 'Se ha enviado un correo electrónico con las instrucciones para recuperar tu contraseña', color: 'success' })
    })
    .catch((error) => {
      if (error instanceof Exception) {
        for (let err of error.errors) {
          if (err.code === ErrorCodes.ERR0001.code) 
            notifyError('No se ha encontrado un usuario con ese correo electrónico')
          else if (err.code === ErrorCodes.ERR0020.code)
            notifyError('No se ha podido enviar el correo electrónico de recuperación, favor de intentarlo de nuevo.')
          else if (err.code === ErrorCodes.ERR0000.code)
            notifyError('Ocurrió un error de servidor, favor de intentarlo de nuevo.')
          else
            notifyError(err.description)
        }
      } else {
        notifyError('Ocurrió un error, favor de intentarlo de nuevo.')
      }
    })
    .finally(() => {
      loading.value = false
    })
}

</script>

<style lang="scss" scoped>
.recover-password-view {
  width: 100%;
  height: fit-content;
  padding: 0 2rem;


  .recover-password-content {
    width: 100%;
    max-width: 620px;
    margin: 0 auto;
  }
}
</style>