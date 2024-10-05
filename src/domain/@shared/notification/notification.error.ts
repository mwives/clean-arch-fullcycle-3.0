import { NotificationErrorProps } from '@shared/notification/notification'

export class NotificationError extends Error {
  constructor(public errors: NotificationErrorProps[]) {
    const message = errors
      .map((error) => `${error.context}: ${error.message}`)
      .join(', ')
    super(message)
  }
}
