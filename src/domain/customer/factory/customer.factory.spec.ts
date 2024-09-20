import { Address } from '@customer/value-object/address'
import { CustomerFactory } from './customer.factory'

describe('CustomerFactory', () => {
  describe('create', () => {
    it('should create a customer instance', () => {
      const customer = CustomerFactory.create('Customer A')
      expect(customer.id).toBeDefined()
      expect(customer.name).toBe('Customer A')
      expect(customer.address).toBeUndefined()
    })

    it('should create a customer instance with address', () => {
      const address = new Address('Main St', 123, '12345', 'Springfield')
      const customer = CustomerFactory.createWithAddress('Customer A', address)

      expect(customer.id).toBeDefined()
      expect(customer.name).toBe('Customer A')
      expect(customer.address).toEqual(address)
    })
  })
})
