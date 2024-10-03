import { ProductFactory } from '@product/factory/product.factory'
import { ListProductUseCase } from './list.product.usecase'

describe('ListProductUseCase Unit Tests', () => {
  const product1 = ProductFactory.create('a', 'any_name', 9.9)
  const product2 = ProductFactory.create('b', 'any_name', 9.9)

  const productRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn().mockResolvedValue([product1, product2]),
    update: jest.fn(),
  }

  describe('execute', () => {
    it('should list products', async () => {
      const useCase = new ListProductUseCase(productRepository)

      const result = await useCase.execute({})

      expect(result.products.length).toBe(2)
      expect(result.products[0].id).toBe(product1.id)
      expect(result.products[0].name).toBe(product1.name)
      expect(result.products[0].price).toBe(product1.price)
      expect(result.products[1].id).toBe(product2.id)
      expect(result.products[1].name).toBe(product2.name)
      expect(result.products[1].price).toBe(product2.price)
    })
  })
})
