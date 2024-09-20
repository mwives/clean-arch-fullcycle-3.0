import { ProductFactory } from './product.factory'

describe('ProductFactory', () => {
  describe('create', () => {
    it('should create a product type A instance', () => {
      const product = ProductFactory.create('a', 'Product A', 10)
      expect(product.id).toBeDefined()
      expect(product.name).toBe('Product A')
      expect(product.price).toBe(10)
      expect(product.constructor.name).toBe('Product')
    })

    it('should create a product type B instance', () => {
      const product = ProductFactory.create('b', 'Product B', 20)
      expect(product.id).toBeDefined()
      expect(product.name).toBe('Product B')
      expect(product.price).toBe(40)
      expect(product.constructor.name).toBe('ProductB')
    })

    it('should throw an error for invalid type', () => {
      expect(() => ProductFactory.create('c', 'Product C', 30)).toThrow(
        'Invalid type'
      )
    })
  })
})
