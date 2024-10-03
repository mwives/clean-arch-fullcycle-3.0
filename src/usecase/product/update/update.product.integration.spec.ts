import { ProductModel } from '@infra/product/repository/sequelize/product.model'
import { ProductRepository } from '@infra/product/repository/sequelize/product.repository'
import { ProductFactory } from '@product/factory/product.factory'
import { Sequelize } from 'sequelize-typescript'
import { UpdateProductUseCase } from './update.product.usecase'

describe('UpdateProductUseCase Integration Tests', () => {
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
    it('should update a product', async () => {
      const product = ProductFactory.create('a', 'any_name', 9.9)

      const productRepository = new ProductRepository()
      await productRepository.create(product)

      const input = {
        id: product.id,
        name: 'new_name',
        price: 10.9,
      }

      const useCase = new UpdateProductUseCase(productRepository)
      const output = await useCase.execute(input)

      expect(output).toEqual({
        id: input.id,
        name: input.name,
        price: input.price,
      })
    })
  })
})
