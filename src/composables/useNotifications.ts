import { reactive } from "vue"


interface INotification {
  message: string
  variant?: string
  color?: string
  duration?: number
}

const snack = reactive<INotification & { show: boolean }>({
  show: false,
  message: '',
  variant: 'tonal',
  color: 'primary',
  duration: 3000,
})


export function useNotifications() {
  const notify = (notification: INotification) => {
    snack.show = true
    snack.message = notification.message
    snack.variant = notification.variant ?? 'tonal'
    snack.color = notification.color ?? 'primary'
    snack.duration = notification.duration ?? 5000
  }

  const notifyError = (message: string) => {
    notify({ message, variant: 'tonal', color: 'pink-accent-3' })
  }

  return { snack, notify, notifyError }
}