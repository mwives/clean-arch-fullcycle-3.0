import { ProductFactory } from '@product/factory/product.factory'
import { FindProductUseCase } from './find.product.usecase'

describe('FindProductUseCase Unit Tests', () => {
  const product = ProductFactory.create('a', 'any_name', 9.9)

  const productRepository = {
    create: jest.fn(),
    findById: jest.fn().mockResolvedValue(product),
    findAll: jest.fn(),
    update: jest.fn(),
  }

  describe('execute', () => {
    it('should find a product', async () => {
      const useCase = new FindProductUseCase(productRepository)

      const input = { id: product.id }
      const output = {
        id: product.id,
        name: product.name,
        price: product.price,
      }

      const result = await useCase.execute(input)

      expect(result).toEqual(output)
    })
  })
})
