import { Address } from '@customer/value-object/address'
import { Customer } from '@customer/entity/customer'
import { NotificationError } from '@shared/notification/notification.error'

describe('Customer', () => {
  it('should throw NotificationError when creating a customer without ID', () => {
    try {
      new Customer('', 'John Doe')
    } catch (error) {
      expect(error).toBeInstanceOf(NotificationError)
      expect((error as NotificationError).message).toBe(
        'customer: ID is required'
      )
    }
  })

  it('should throw NotificationError when creating a customer without name', () => {
    try {
      new Customer('123', '')
    } catch (error) {
      expect(error).toBeInstanceOf(NotificationError)
      expect((error as NotificationError).message).toBe(
        'customer: Name is required'
      )
    }
  })

  it('should change name', () => {
    const customer = new Customer('123', 'John Doe')
    customer.changeName('Jane Doe')
    expect(customer.name).toBe('Jane Doe')
  })

  it('should activate customer', () => {
    const customer = new Customer('123', 'John Doe')
    const address = new Address('Main St', 123, '12345-678', 'São Paulo')
    customer.changeAddress(address)
    customer.activate()
    expect(customer.isActive()).toBe(true)
  })

  it('should throw error when activating customer without address', () => {
    const customer = new Customer('123', 'John Doe')
    expect(() => customer.activate()).toThrow(
      'Address is required to activate customer'
    )
  })

  it('should deactivate customer', () => {
    const customer = new Customer('123', 'John Doe')
    customer.deactivate()
    expect(customer.isActive()).toBe(false)
  })

  it('should add reward points', () => {
    const customer = new Customer('123', 'John Doe')

    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(100)
    expect(customer.rewardPoints).toBe(100)

    customer.addRewardPoints(50)
    expect(customer.rewardPoints).toBe(150)
  })
})
