import { InputCreateProductDto } from './create.product.dto'
import { CreateProductUseCase } from './create.product.usecase'

describe('CreateProductUseCase Unit Tests', () => {
  const productRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  }

  describe('execute', () => {
    const input: InputCreateProductDto = {
      type: 'a',
      name: 'any_name',
      price: 9.9,
    }

    it('should create a product', async () => {
      const createProductUseCase = new CreateProductUseCase(productRepository)

      const output = await createProductUseCase.execute(input)

      expect(output).toEqual({
        id: expect.any(String),
        name: 'any_name',
        price: 9.9,
      })
    })

    it('should throw if invalid type', async () => {
      const createProductUseCase = new CreateProductUseCase(productRepository)

      await expect(
        createProductUseCase.execute({ ...input, type: 'invalid_type' })
      ).rejects.toThrow(new Error('Invalid type'))
    })
  })
})
