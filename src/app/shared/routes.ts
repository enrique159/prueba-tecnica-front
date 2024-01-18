const finish = (string: string, end: string) => string.endsWith(end) ? string : `${string}${end}`
const finishSlash = (string: string) => finish(string, "/")


// AUTH ROUTES
const signIn = (baseUrl: string) => `${finishSlash(baseUrl)}auth/token`
const signOut = (baseUrl: string) => `${finishSlash(baseUrl)}auth/logout`
const recoverPassword = (baseUrl: string, email: string) => `${finishSlash(baseUrl)}auth/recover/${email}`
// USER ROUTES
const signUp = (baseUrl: string) => `${finishSlash(baseUrl)}users/signup`
const updatePassword = (baseUrl: string) => `${finishSlash(baseUrl)}users/update-password`
// INVITATIONS ROUTES
const createInvitation = (baseUrl: string) => `${finishSlash(baseUrl)}invitations/`
const getInvitations = (baseUrl: string) => `${finishSlash(baseUrl)}invitations/`
const getInvitation = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}invitations/${id}`
const deleteInvitation = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}invitations/${id}`
const updateInvitation = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}invitations/${id}`

export default {
  signIn,
  signOut,
  signUp,
  recoverPassword,
  updatePassword,

  createInvitation,
  getInvitations,
  getInvitation,
  deleteInvitation,
  updateInvitation
}