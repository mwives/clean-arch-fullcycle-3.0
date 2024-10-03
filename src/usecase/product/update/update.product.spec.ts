import { ProductFactory } from '@product/factory/product.factory'
import { InputUpdateProductDto } from './update.product.dto'
import { UpdateProductUseCase } from './update.product.usecase'

describe('UpdateProductUseCase Unit Tests', () => {
  const product = ProductFactory.create('a', 'any_name', 9.9)

  const productRepository = {
    create: jest.fn(),
    findById: jest.fn().mockResolvedValue(product),
    findAll: jest.fn(),
    update: jest.fn(),
  }

  describe('execute', () => {
    it('should update a product', async () => {
      const usecase = new UpdateProductUseCase(productRepository)
      const input: InputUpdateProductDto = {
        id: product.id,
        name: 'new_name',
        price: 10.9,
      }

      const output = await usecase.execute(input)

      expect(output).toEqual({
        id: input.id,
        name: input.name,
        price: input.price,
      })
    })
  })
})
