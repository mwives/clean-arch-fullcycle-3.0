export type NotificationErrorProps = {
  message: string
  context: string
}

export class Notification {
  private _errors: NotificationErrorProps[] = []

  get errors(): NotificationErrorProps[] {
    return this._errors
  }

  addError(error: NotificationErrorProps): void {
    this._errors.push(error)
  }

  hasErrors(): boolean {
    return this._errors.length > 0
  }

  messages(context?: string): string {
    let errors = this._errors

    if (context) {
      errors = this._errors.filter((error) => error.context === context)
    }

    return errors
      .map((error) => `${error.context}: ${error.message}`)
      .join(', ')
  }
}
