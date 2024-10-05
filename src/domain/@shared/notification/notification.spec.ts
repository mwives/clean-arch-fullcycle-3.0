import { Notification } from './notification'

describe('Notification', () => {
  let notification: Notification

  beforeEach(() => {
    notification = new Notification()
  })

  it('should create errors', () => {
    const error = {
      message: 'error message',
      context: 'customer',
    }
    notification.addError(error)

    expect(notification.messages('customer')).toEqual('customer: error message')
  })

  it('should group errors by context', () => {
    const error1 = {
      message: 'error message',
      context: 'customer',
    }
    const error2 = {
      message: 'error message 2',
      context: 'customer',
    }
    const error3 = {
      message: 'error message 3',
      context: 'order',
    }

    notification.addError(error1)
    notification.addError(error2)
    notification.addError(error3)

    expect(notification.messages('customer')).toBe(
      'customer: error message, customer: error message 2' // order should not be here
    )
  })

  it('should return all errors if no context is provided', () => {
    const error1 = {
      message: 'error message',
      context: 'customer',
    }
    const error2 = {
      message: 'error message 2',
      context: 'order',
    }

    notification.addError(error1)
    notification.addError(error2)

    expect(notification.messages()).toBe(
      'customer: error message, order: error message 2'
    )
  })

  it('should check if there are errors', () => {
    expect(notification.hasErrors()).toBe(false)

    notification.addError({
      message: 'error message',
      context: 'customer',
    })

    expect(notification.hasErrors()).toBe(true)
  })

  it('should get all errors props', () => {
    const error = {
      message: 'error message',
      context: 'customer',
    }
    notification.addError(error)

    expect(notification.errors).toEqual([error])
  })
})
