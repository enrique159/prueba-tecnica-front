<template>
  <div class="signup-view animate__animated animate__fadeIn">
    <h1 class="text-center">Registrarme</h1>
    <div class="text-center" v-if="loading">
      <h1>Creando usuario</h1>
      <p class="text-grey-darken-1 mb-4">Subiendo datos al servidor</p>
      <v-progress-linear
        indeterminate
        color="cyan"
      ></v-progress-linear>
    </div>
    <v-stepper
      v-else
      v-model="step"
      class="stepper-container"
      :items="['Información', 'Departamento', 'Credenciales']"
      hide-actions
      alt-labels
    >
      <template v-slot:item.1>
        <v-card title="Hola, ¿Cómo te llamas? 👋" flat>

          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                class="mb-2"
                v-model="name"
                :rules="nameRules"
                variant="outlined"
                label="Nombre(s)"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                class="mb-2"
                v-model="lastname"
                :rules="lastnameRules"
                variant="outlined"
                label="Apellido(s)"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </template>

      <template v-slot:item.2>
        <v-card title="¿En qué area estás? 🗂️" flat>
          <v-row>
            <v-col cols="12">
              <v-text-field
                class="mb-2"
                v-model="department"
                :rules="departmentRules"
                variant="outlined"
                label="No. Departamento"
                type="number"
                required
              >
            </v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </template>

      <template v-slot:item.3>
        <v-card title="Crea tu usuario y contraseña 🚀" flat>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                type="email"
                v-model="email"
                :rules="emailRules"
                :prepend-inner-icon="IconMail"
                variant="outlined"
                label="Correo electrónico"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                class="mb-2"
                v-model="password"
                :rules="passwordRules"
                :type="showPasswords ? 'text' : 'password'"
                :prepend-inner-icon="IconKey"
                :append-inner-icon="showPasswords ? IconEye : IconEyeClosed"
                @click:append-inner="showPasswords = !showPasswords"
                label="Contraseña"
                variant="outlined"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                class="mb-2"
                v-model="confirmPassword"
                :rules="confirmPasswordRules"
                :type="showPasswords ? 'text' : 'password'"
                :prepend-inner-icon="IconKey"
                :append-inner-icon="showPasswords ? IconEye : IconEyeClosed"
                @click:append-inner="showPasswords = !showPasswords"
                variant="outlined"
                label="Confirmar contraseña"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </template>

      <v-stepper-actions 
        @click:next="nextStep"
        @click:prev="prevStep"
        next-text="Siguiente"
        prev-text="Atrás"
      >
        <template v-slot:next v-if="step === 3">
          <v-btn @click="signUpUser()" :disabled="!validateCurrentStep">
            Registrarme
          </v-btn>
        </template>
      </v-stepper-actions>
    </v-stepper>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { IconMail, IconEye, IconEyeClosed, IconKey } from '@tabler/icons-vue'
import { useAppStore } from '@/stores/appStore'
import { ISignUpRequest } from '@/app/modules/users/interfaces'
import { useNotifications } from '@/composables/useNotifications'
import { useRouter } from 'vue-router'
import Exception from '@/app/shared/error/Exception'
import ErrorCodes from '@/app/shared/error/ErrorCodes'

const step = ref(1)

const name = ref('')
const lastname = ref('')
const department = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const showPasswords = ref(false)

const regexOnlyLetters = /^[a-zA-Z\s]*$/
const regexOnlyNumbers = /^[0-9]*$/
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const nameRules = [
  (v: string) => !!v || 'El nombre es requerido',
  (v: string) => v.length <= 30 || 'El nombre es muy largo',
  (v: string) => regexOnlyLetters.test(v) || 'El nombre solo puede contener letras'
]
const lastnameRules = [
  (v: string) => !!v || 'El apellido es requerido',
  (v: string) => v.length <= 60 || 'El apellido es muy largo',
  (v: string) => regexOnlyLetters.test(v) || 'El apellido solo puede contener letras'
]

const departmentRules = [
  (v: string) => !!v || 'El departamento es requerido',
  (v: string) => v.length <= 4 || 'El departamento es muy largo',
  (v: string) => regexOnlyNumbers.test(v) || 'El departamento solo puede contener números'
]

const emailRules = [
  (v: string) => !!v || 'El correo electrónico es requerido',
  (v: string) => v.length <= 60 || 'El correo electrónico es muy largo',
  (v: string) => regexEmail.test(v) || 'El correo electrónico no es válido'
]

const passwordRules = [
  (v: string) => !!v || 'La contraseña es requerida',
  (v: string) => v.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
  (v: string) => v.length <= 60 || 'La contraseña es muy larga',
]

const confirmPasswordRules = [
  (v: string) => !!v || 'La contraseña es requerida',
  (v: string) => v.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
  (v: string) => v.length <= 60 || 'La contraseña es muy larga',
  (v: string) => v === password.value || 'Las contraseñas no coinciden'
]


const firstStepComplete = computed(() => {
  const validName = nameRules.every(rule => rule(name.value) === true)
  const validLastname = lastnameRules.every(rule => rule(lastname.value) === true)
  return validName && validLastname
})

const thirdStepComplete = computed(() => {
  const validEmail = emailRules.every(rule => rule(email.value) === true)
  const validPassword = passwordRules.every(rule => rule(password.value) === true)
  const validConfirmPassword = confirmPasswordRules.every(rule => rule(confirmPassword.value) === true)
  return validEmail && validPassword && validConfirmPassword
})

const validateCurrentStep = computed(() => {
  if (step.value === 1) 
    return firstStepComplete.value
  else if (step.value === 2)
    return departmentRules.every(rule => rule(department.value) === true)
  else if (step.value === 3)
    return thirdStepComplete.value
})

const prevStep = () => {
  step.value--
}

const nextStep = () => {
  if (validateCurrentStep)
  step.value++
}

// SIGN UP API
const router = useRouter()
const { signUp } = useAppStore()
const { notify, notifyError } = useNotifications()
const loading = ref(false)

const signUpUser = async() => {
  loading.value = true
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user: ISignUpRequest = {
    name: name.value,
    lastname: lastname.value,
    department: parseInt(department.value),
    email: email.value,
    password: password.value,
  }

  await signUp(user)
    .then((response) => {
      console.log(response)
      notify({ message: 'Usuario creado correctamente', color: 'success' })
      router.push({ name: 'SignIn' })
    })
    .catch((error) => {
      if (error instanceof Exception) {
        for (let err of error.errors) {
          if (err.code === ErrorCodes.ERR0007.code) 
            notifyError('Ya existe un usuario con este correo electrónico.')
          else if (err.code === ErrorCodes.ERR0008.code) 
            notifyError('Ha ocurrido un error en la información del usuario. Intentarlo de nuevo.')
            else if (err.code === ErrorCodes.ERR0013.code) 
            notifyError('Ya existe un usuario con las mismas credenciales.')
          else if (err.code === ErrorCodes.ERR0000.code)
            notifyError('Ocurrió un error al intentar registrar, favor de intentarlo de nuevo.')
          else
            notifyError(err.description)
        }
      } else {
        notifyError('Ocurrió un error al intentar registrar, favor de intentarlo de nuevo.')
      }
      loading.value = false
    })
}
</script>

<style lang="scss" scoped>
.signup-view {
  width: 100%;
  height: fit-content;
  display: grid;
  place-items: center;
  padding: 0 2rem;

  .stepper-container {
    width: 100%;
    max-width: 620px;
    background-color: white;
    box-shadow: none;
  }
}

:deep(.v-stepper-header) {
  background-color: #ffffff;
  box-shadow: none;
}
</style>