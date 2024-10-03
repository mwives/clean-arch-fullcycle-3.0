import { Sequelize } from 'sequelize-typescript'

import { ProductModel } from '@infra/product/repository/sequelize/product.model'
import { ProductRepository } from '@infra/product/repository/sequelize/product.repository'
import { CreateProductUseCase } from './create.product.usecase'

describe('CreateProductUseCase Integration Tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  describe('execute', () => {
    it('should create a product', async () => {
      const input = {
        type: 'a',
        name: 'any_name',
        price: 9.9,
      }

      const createProductUseCase = new CreateProductUseCase(
        new ProductRepository()
      )
      const output = await createProductUseCase.execute(input)

      expect(output).toEqual({
        id: expect.any(String),
        name: input.name,
        price: input.price,
      })
    })
  })
})
