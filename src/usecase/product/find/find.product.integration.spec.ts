import { Sequelize } from 'sequelize-typescript'

import { ProductModel } from '@infra/product/repository/sequelize/product.model'
import { ProductRepository } from '@infra/product/repository/sequelize/product.repository'
import { ProductFactory } from '@product/factory/product.factory'
import { FindProductUseCase } from './find.product.usecase'

describe('FindProductUseCase Integration Tests', () => {
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
    const product = ProductFactory.create('a', 'any_name', 9.9)

    it('should find a product', async () => {
      const productRepository = new ProductRepository()
      await productRepository.create(product)

      const useCase = new FindProductUseCase(productRepository)

      const input = { id: product.id }
      const result = await useCase.execute(input)

      expect(result).toEqual({
        id: product.id,
        name: product.name,
        price: product.price,
      })
    })

    it('should throw if product not found', async () => {
      const productRepository = new ProductRepository()
      const useCase = new FindProductUseCase(productRepository)

      const input = { id: product.id }

      await expect(useCase.execute(input)).rejects.toThrow('Product not found')
    })
  })
})
