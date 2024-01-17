import { defineStore } from 'pinia'
import { RemovableRef, useLocalStorage } from '@vueuse/core'
import { User } from '@/types/User.type'

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
  }
})