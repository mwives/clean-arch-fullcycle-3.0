import { NotificationErrorProps } from '@shared/notification/notification'

export class NotificationError extends Error {
  constructor(public errors: NotificationErrorProps[]) {
    super()
  }
}
