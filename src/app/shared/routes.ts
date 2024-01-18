const finish = (string: string, end: string) => string.endsWith(end) ? string : `${string}${end}`
const finishSlash = (string: string) => finish(string, "/")


// AUTH ROUTES
const signIn = (baseUrl: string) => `${finishSlash(baseUrl)}auth/token`


export default {
  signIn,
}