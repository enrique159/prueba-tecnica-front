import { ID } from "./Id.type"

export type User = {
  id: ID
  name: string
  lastname: string
  email: string
  password: string
  department: number
}