import { CustomerFactory } from '@customer/factory/customer.factory'
import { Address } from '@customer/value-object/address'
import { ListCustomerUseCase } from './list.customer.usecase'

describe('ListCustomerUseCase Unit Tests', () => {
  const address = new Address('any_street', 123, 'any_zipcode', 'any_city')
  const customer1 = CustomerFactory.createWithAddress('any_name', address)
  const customer2 = CustomerFactory.createWithAddress('another_name', address)

  const customerRepository = {
    create: jest.fn(),
    findAll: jest.fn().mockResolvedValue([customer1, customer2]),
    findById: jest.fn(),
    update: jest.fn(),
  }

  describe('execute', () => {
    it('should list all customers', async () => {
      const listCustomerUseCase = new ListCustomerUseCase(customerRepository)

      const output = await listCustomerUseCase.execute({})

      expect(output.customers.length).toBe(2)
      expect(output.customers[0].id).toBe(customer1.id)
      expect(output.customers[0].name).toBe(customer1.name)
      expect(output.customers[0].address.street).toBe(customer1.address.street)
      expect(output.customers[1].id).toBe(customer2.id)
      expect(output.customers[1].name).toBe(customer2.name)
      expect(output.customers[1].address.street).toBe(customer2.address.street)
    })
  })
})
