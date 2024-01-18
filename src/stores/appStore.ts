import { defineStore } from 'pinia'
import { RemovableRef, useLocalStorage } from '@vueuse/core'
import { User } from '@/types/User.type'
import { signIn as signInUseCase } from '@/app/auth/SignInRepository'
import { ISignInRequest } from '@/app/auth/interfaces'

interface AppState {
  token: RemovableRef<string>
  user: User | null
}

export const useAppStore = defineStore('app', {
  state: ():AppState => ({
    token: useLocalStorage('token', ''),
    user: null
  }),
  getters: {
    validToken: (state) => state.token !== '',
    getToken: (state) => state.token,
    getUser: (state) => state.user
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
      this.token = ''
      this.user = null
    }
  }
})