<template>
  <div class="signin-view">
    <div class="signin-form">
      <h1>Inicia sesión</h1>
      <p class="text-grey-darken-1">Para ingresar a la plataforma</p>

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

        <v-text-field
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

        <v-btn type="submit" color="#771BE9" :loading="loading" variant="tonal" block class="mt-2 py-6">
          Ingresar
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconMail, IconEye, IconEyeClosed, IconKey } from '@tabler/icons-vue'
import { ref } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { ISignInRequest } from '@/app/auth/interfaces'
import Exception from '@/app/shared/error/Exception'
import ErrorCodes from '@/app/shared/error/ErrorCodes'
import { useNotifications } from '@/composables/useNotifications'
import { useRouter } from 'vue-router'

const valid = ref(false)
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)

const emailRules = [
  (v: string) => !!v || 'El correoo es requerido',
  (v: string) => /.+@.+\..+/.test(v) || 'El correo debe ser válido',
]

const passwordRules = [
  (v: string) => !!v || 'La contraseña es requerida',
  (v: string) => v.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
]

const { signIn, setToken, setUser } = useAppStore()
const { notifyError } = useNotifications()
const router = useRouter()

const validate = async () => {
  if(valid.value) {
    loading.value = true

    const credentials: ISignInRequest = {
      email: email.value,
      password: password.value,
    }

    await signIn(credentials)
      .then((response) => {
        setToken(response.data.token)
        setUser(response.data.user)
        router.push({ name: 'Home' })
      })
      .catch((error) => {
        if (error instanceof Exception) {
          for (let err of error.errors) {
            if (err.code === ErrorCodes.ERR0001.code) 
              notifyError('No se ha encontrado un usuario con ese correo electrónico')
            else if (err.code === ErrorCodes.ERR0017.code) 
              notifyError('La contraseña es incorrecta.')
            else if (err.code === ErrorCodes.ERR0000.code)
              notifyError('Ocurrió un error al iniciar sesión, favor de intentarlo de nuevo.')
            else
              notifyError(err.description)
          }
        } else {
          notifyError('Ocurrió un error al iniciar sesión, favor de intentarlo de nuevo.')
        }
      })
      .finally(() => {
        loading.value = false
      })
  }
}
</script>

<style lang="scss" scoped>
.signin-view {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  padding: 0 2rem;
  .signin-form {
    width: 100%;
    max-width: 358px;
    height: fit-content;
    padding-bottom: 3rem;
  }
}
</style>