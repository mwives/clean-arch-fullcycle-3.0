export type NotificationError = {
  message: string
  context: string
}

export class Notification {
  private errors: NotificationError[] = []

  addError(error: NotificationError): void {
    this.errors.push(error)
  }

  messages(context?: string): string {
    let errors = this.errors

    if (context) {
      errors = this.errors.filter((error) => error.context === context)
    }

    return errors
      .map((error) => `${error.context}: ${error.message}`)
      .join(', ')
  }
}
