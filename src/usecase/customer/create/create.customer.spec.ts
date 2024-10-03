import { InputCreateCustomerDto } from './create.customer.dto'
import { CreateCustomerUseCase } from './create.customer.usecase'

describe('CreateCustomerUseCase Unit Tests', () => {
  const customerRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  }

  describe('execute', () => {
    const input: InputCreateCustomerDto = {
      name: 'any_name',
      address: {
        street: 'any_street',
        number: 123,
        zip: 'any_zipcode',
        city: 'any_city',
      },
    }

    it('should create a customer', async () => {
      const useCase = new CreateCustomerUseCase(customerRepository)

      const output = {
        id: expect.any(String),
        name: input.name,
        address: {
          street: input.address.street,
          number: input.address.number,
          zip: input.address.zip,
          city: input.address.city,
        },
      }

      const result = await useCase.execute(input)

      expect(result).toEqual(output)
    })

    it('should throw if name is empty', async () => {
      const useCase = new CreateCustomerUseCase(customerRepository)

      await expect(useCase.execute({ ...input, name: '' })).rejects.toThrow(
        'Name is required'
      )
    })

    it('should throw if street is empty', async () => {
      const useCase = new CreateCustomerUseCase(customerRepository)

      await expect(
        useCase.execute({ ...input, address: { ...input.address, street: '' } })
      ).rejects.toThrow('Street is required')
    })
  })
})
