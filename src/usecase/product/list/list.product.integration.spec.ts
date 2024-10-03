import { ProductModel } from '@infra/product/repository/sequelize/product.model'
import { ProductRepository } from '@infra/product/repository/sequelize/product.repository'
import { ProductFactory } from '@product/factory/product.factory'
import { Sequelize } from 'sequelize-typescript'
import { ListProductUseCase } from './list.product.usecase'

describe('ListProductUseCase Integration Test', () => {
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
    it('should list products', async () => {
      const product1 = ProductFactory.create('a', 'any_name1', 9.9)
      const product2 = ProductFactory.create('b', 'any_name2', 9.9)

      const productRepository = new ProductRepository()
      await productRepository.create(product1)
      await productRepository.create(product2)

      const useCase = new ListProductUseCase(productRepository)
      const output = await useCase.execute({})

      expect(output.products).toHaveLength(2)
      expect(output.products[0].name).toBe('any_name1')
      expect(output.products[0].price).toBe(9.9)
      expect(output.products[1].name).toBe('any_name2')
      expect(output.products[1].price).toBe(19.8)
    })
  })
})
