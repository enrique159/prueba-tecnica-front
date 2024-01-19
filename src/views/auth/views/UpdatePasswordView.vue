<template>
  <div class="update-password-view">
    <div class="update-password-content">
      <h1>Nueva contraseña</h1>
      <p>Ingresa tu nueva contraseña.</p>

      <v-row>
        <v-col cols="12" sm="7">
          <v-form class="pt-8" v-model="valid" @submit.prevent="validate">
            <v-text-field
              class="mb-2"
              v-model="password"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              :prepend-inner-icon="IconKey"
              :append-inner-icon="showPassword ? IconEye : IconEyeClosed"
              @click:append-inner="showPassword = !showPassword"
              label="Contraseña"
              variant="outlined"
              required
            ></v-text-field>

            <v-text-field
              v-model="confirmPassword"
              :rules="confirmPasswordRules"
              :type="showPassword ? 'text' : 'password'"
              :prepend-inner-icon="IconKey"
              :append-inner-icon="showPassword ? IconEye : IconEyeClosed"
              @click:append-inner="showPassword = !showPassword"
              variant="outlined"
              label="Confirmar contraseña"
              required
            ></v-text-field>

            <v-btn type="submit" color="#771BE9" :loading="loading" variant="tonal" block class="mt-2 mb-8 py-6">
              Actualizar contraseña
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconEye, IconEyeClosed, IconKey } from '@tabler/icons-vue'
import { useAppStore } from '@/stores/appStore'
import { useNotifications } from '@/composables/useNotifications'
import { IHttpSettings } from '@/app/network/domain/interfaces/IHttpSettings'
import { IUpdatePasswordRequest } from '@/app/modules/users/interfaces'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import Exception from '@/app/shared/error/Exception'
import ErrorCodes from '@/app/shared/error/ErrorCodes'

const valid = ref(false)
const password = ref('')
const confirmPassword = ref('')

const showPassword = ref(false)
const loading = ref(false)

const passwordRules = [
  (v: string) => !!v || 'La contraseña es requerida',
  (v: string) => v.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
]

const confirmPasswordRules = [
  (v: string) => !!v || 'La contraseña es requerida',
  (v: string) => v.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
  (v: string) => v === password.value || 'Las contraseñas no coinciden',
]

const route = useRoute()
const router = useRouter()
const { updatePassword } = useAppStore()
const { notify, notifyError } = useNotifications()



const validate = async() => {
  if (!valid.value) return

  const request: IUpdatePasswordRequest ={
    password: password.value
  }

  const authHeader: IHttpSettings = {
    Authorization: `Bearer ${route.params.token?.toString()}`
  }
  loading.value = true
  console.log(request, authHeader)

  await updatePassword(request, authHeader)
    .then(() => {
      notify({ message: 'Contraseña actualizada', color: 'success' })
      router.push({ name: 'SignIn' })
    })
    .catch((error: Exception) => {
      if (error instanceof Exception) {
        for (let err of error.errors) {
          if (err.code === ErrorCodes.ERR0001.code) 
            notifyError('Ya existe un usuario el id proporcionado.')
          else
            notifyError(err.description)
        }
      } else {
        notifyError('Ocurrió un error al intentar cambiar la contraseña, favor de intentarlo de nuevo.')
      }
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<style lang="scss" scoped>
.update-password-view {
  width: 100%;
  height: fit-content;
  padding: 0 2rem;

  .update-password-content {
    width: 100%;
    max-width: 620px;
    margin: 0 auto;
  }
}
</style>