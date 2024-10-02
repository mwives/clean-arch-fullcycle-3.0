import { Customer } from '@customer/entity/customer'
import { Address } from '@customer/value-object/address'
import { FindCustomerUseCase } from './find.customer.usecase'

describe('FindCustomerUseCase Unit Tests', () => {
  const customer = new Customer('123', 'any_name')
  const address = new Address('any_street', 123, 'any_zipcode', 'any_city')
  customer.changeAddress(address)

  const customerRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn().mockResolvedValue(customer),
    update: jest.fn(),
  }

  describe('execute', () => {
    it('should find a customer', async () => {
      const useCase = new FindCustomerUseCase(customerRepository)

      const input = { id: '123' }
      const output = {
        id: '123',
        name: 'any_name',
        address: {
          street: 'any_street',
          number: 123,
          zipcode: 'any_zipcode',
          city: 'any_city',
        },
      }

      const result = await useCase.execute(input)

      expect(result).toEqual(output)
    })

    it('should throw an error when customer is not found', async () => {
      const useCase = new FindCustomerUseCase(customerRepository)

      customerRepository.findById.mockImplementation(() => {
        throw new Error('Customer not found')
      })

      const input = { id: '123456' }

      await expect(useCase.execute(input)).rejects.toThrow('Customer not found')
    })
  })
})
