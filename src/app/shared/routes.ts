import { QueryParams } from "../modules/invitations/interfaces"

const finish = (string: string, end: string) => string.endsWith(end) ? string : `${string}${end}`
const finishSlash = (string: string) => finish(string, "/")
const generateQueryParams = (params: QueryParams) => {
  const { page, limit, search, sort, order } = params
  const queryParams = []
  if (page) queryParams.push(`page=${page}`)
  if (limit) queryParams.push(`limit=${limit}`)
  if (search) queryParams.push(`search=${search}`)
  if (sort) queryParams.push(`sort=${sort}`)
  if (order) queryParams.push(`order=${order}`)
  return queryParams.join("&")
}


// AUTH ROUTES
const signIn = (baseUrl: string) => `${finishSlash(baseUrl)}auth/token`
const signOut = (baseUrl: string) => `${finishSlash(baseUrl)}auth/logout`
const recoverPassword = (baseUrl: string, email: string) => `${finishSlash(baseUrl)}auth/recover/${email}`
// USER ROUTES
const signUp = (baseUrl: string) => `${finishSlash(baseUrl)}users/signup`
const updatePassword = (baseUrl: string) => `${finishSlash(baseUrl)}users/update-password`
// INVITATIONS ROUTES
const createInvitation = (baseUrl: string) => `${finishSlash(baseUrl)}invitations/`
const getInvitations = (baseUrl: string, meta: QueryParams) => `${finishSlash(baseUrl)}invitations?${generateQueryParams(meta)}`
const getInvitation = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}invitations/${id}`
const deleteInvitation = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}invitations/${id}`
const updateInvitation = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}invitations/${id}`
const acceptInvitation = (baseUrl: string, id: string) => `${finishSlash(baseUrl)}invitations/accept/${id}`

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
  updateInvitation,
  acceptInvitation
}