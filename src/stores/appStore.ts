import { defineStore } from 'pinia'
import { RemovableRef, useLocalStorage } from '@vueuse/core'
import { User } from '@/types/User.type'
import { 
  signIn as signInUseCase,
  signOut as signOutUseCase,
  recoverPassword as recoverPasswordUseCase
} from '@/app/auth/SignInRepository'
import {
  createInvitation as createInvitationUseCase,
  getInvitations as getInvitationsUseCase,
  getInvitation as getInvitationUseCase,
  acceptInvitation as acceptInvitationUseCase,
} from '@/app/modules/invitations/InvitationsServices'
import { signUp as signUpUseCase, updatePassword as updatePasswordUseCase } from '@/app/modules/users/UsersServices'
import { ISignInRequest } from '@/app/auth/interfaces'
import { ISignUpRequest, IUpdatePasswordRequest } from '@/app/modules/users/interfaces'
import { IHttpSettings } from '@/app/network/domain/interfaces/IHttpSettings'
import { InvitationRequest, QueryParams } from '@/app/modules/invitations/interfaces'

interface AppState {
  token: RemovableRef<string>
  user: RemovableRef<Partial<User>>
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    token: useLocalStorage('token', ''),
    user: useLocalStorage('user', {
      id: '',
      name: '',
      lastname: '',
      email: '',
      department: 0,
    })
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
        this.user = {
          id: '',
          name: '',
          lastname: '',
          email: '',
          department: 0,
        }
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
    },


    // /////////// INVITATIONS //////////

    // CREATE INVITATION
    createInvitation(payload: InvitationRequest) {
      const action = createInvitationUseCase(payload, this.getAuthHeader)
      action.then((response) => {
        return response
      }).catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

      return action
    },

    // GET INVITATIONS
    getInvitations(meta: QueryParams) {
      const action = getInvitationsUseCase(meta, this.getAuthHeader)
      action.then((response) => {
        return response
      }).catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

      return action
    },

    getInvitation(id: string) {
      const action = getInvitationUseCase(id)
      action.then((response) => {
        return response
      }).catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

      return action
    },

    acceptInvitation(id: string) {
      const action = acceptInvitationUseCase(id)
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