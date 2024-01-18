import { NetworkMessage } from "@/app/network/domain/interfaces/NetworkMessage"

export interface Response<T> {
  meta?: T
  data: T
  warnings: NetworkMessage[]
  errors: NetworkMessage[]
}
