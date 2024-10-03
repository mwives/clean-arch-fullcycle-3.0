import { CustomerFactory } from '@customer/factory/customer.factory'
import { Address } from '@customer/value-object/address'
import { InputUpdateCustomerDto } from './update.customer.dto'
import { UpdateCustomerUseCase } from './update.customer.usecase'

describe('UpdateCustomerUseCase Unit Tests', () => {
  const address = new Address('any_street', 123, 'any_zipcode', 'any_city')
  const customer = CustomerFactory.createWithAddress('any_name', address)

  const customerRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn().mockResolvedValue(customer),
    update: jest.fn(),
  }

  describe('execute', () => {
    const input: InputUpdateCustomerDto = {
      id: customer.id,
      name: 'new_name',
      address: {
        street: 'new_street',
        number: 321,
        zip: 'new_zipcode',
        city: 'new_city',
      },
    }

    it('should update a customer', async () => {
      const updateCustomerUseCase = new UpdateCustomerUseCase(
        customerRepository
      )

      const output = await updateCustomerUseCase.execute(input)

      expect(output).toEqual(input)
    })

    it('should throw if customer is not found', async () => {
      customerRepository.findById.mockImplementationOnce(() => {
        throw new Error('Customer not found')
      })

      const updateCustomerUseCase = new UpdateCustomerUseCase(
        customerRepository
      )

      await expect(updateCustomerUseCase.execute(input)).rejects.toThrow(
        'Customer not found'
      )
    })
  })
})
