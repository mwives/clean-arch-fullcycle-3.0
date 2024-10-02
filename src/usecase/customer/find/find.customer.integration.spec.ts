import { Sequelize } from 'sequelize-typescript'

import { Customer } from '@customer/entity/customer'
import { Address } from '@customer/value-object/address'
import { CustomerModel } from '@infra/customer/repository/sequelize/customer.model'
import { CustomerRepository } from '@infra/customer/repository/sequelize/customer.repository'
import { FindCustomerUseCase } from './find.customer.usecase'

describe('FindCustomerUseCase Integration Tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  describe('execute', () => {
    it('should find a customer', async () => {
      const customer = new Customer('123', 'any_name')
      const address = new Address('any_street', 123, 'any_zipcode', 'any_city')
      customer.changeAddress(address)

      const customerRepository = new CustomerRepository()
      await customerRepository.create(customer)

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
  })
})
