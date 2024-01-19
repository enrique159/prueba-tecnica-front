import { defineStore } from 'pinia'
import { RemovableRef, useLocalStorage } from '@vueuse/core'
import { User } from '@/types/User.type'
import { 
  signIn as signInUseCase,
  signOut as signOutUseCase,
  recoverPassword as recoverPasswordUseCase
} from '@/app/auth/SignInRepository'
import { signUp as signUpUseCase, updatePassword as updatePasswordUseCase } from '@/app/modules/users/UsersServices'
import { ISignInRequest } from '@/app/auth/interfaces'
import { ISignUpRequest, IUpdatePasswordRequest } from '@/app/modules/users/interfaces'
import { IHttpSettings } from '@/app/network/domain/interfaces/IHttpSettings'

interface AppState {
  token: RemovableRef<string>
  user: User | null
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    token: useLocalStorage('token', ''),
    user: null
  }),
  getters: {
    validToken: (state) => state.token !== '',
    getToken: (state) => state.token,
    getUser: (state) => state.user,
    getAuthHeader: (state) => ({ Authorization: `Bearer ${state.token}` })
  },
  actions: {
    // USER
    setUser(user: User) {
      this.user = user
    },
    // TOKEN
    setToken(token: string) {
      this.token = token
    },

    // SIGN IN
    signIn(credentials: ISignInRequest) {
      const action = signInUseCase(credentials)
      action.then((response) => {
        return response
      }).catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

      return action
    },

    // SIGN OUT
    signOut() {
      const action = signOutUseCase(this.getAuthHeader)
      action.then((response) => {
        this.token = ''
        this.user = null
        return response
      }).catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

      return action
    },

    // SIGN UP
    signUp(payload: ISignUpRequest) {
      const action = signUpUseCase(payload)
      action.then((response) => {
        return response
      }).catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

      return action
    },

    // RECOVER PASSWORD
    recoverPassword(email: string) {
      const action = recoverPasswordUseCase(email)
      action.then((response) => {
        return response
      }).catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

      return action
    },

    // UPDATE PASSWORD
    updatePassword(payload: IUpdatePasswordRequest, auth: IHttpSettings) {
      const action = updatePasswordUseCase(payload, auth)
      action.then((response) => {
        return response
      }).catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

      return action
    }
  }
})