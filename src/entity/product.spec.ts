import { Product } from './product'

describe('Product', () => {
  it('should throw error when creating a product without ID', () => {
    expect(() => new Product('', 'Product 1', 10)).toThrow('ID is required')
  })

  it('should throw error when creating a product without name', () => {
    expect(() => new Product('123', '', 10)).toThrow('Name is required')
  })

  it('should throw error when creating a product without price', () => {
    expect(() => new Product('123', 'Product 1', 0)).toThrow(
      'Price must be greater than 0'
    )
  })

  it('should throw error when creating a product with negative price', () => {
    expect(() => new Product('123', 'Product 1', -10)).toThrow(
      'Price must be greater than 0'
    )
  })

  it('should change name', () => {
    const product = new Product('123', 'Product 1', 10)
    product.changeName('Product 2')
    expect(product.name).toBe('Product 2')
  })

  it('should throw error when changing name to empty', () => {
    const product = new Product('123', 'Product 1', 10)
    expect(() => product.changeName('')).toThrow('Name is required')
  })

  it('should change price', () => {
    const product = new Product('123', 'Product 1', 10)
    product.changePrice(20)
    expect(product.price).toBe(20)
  })

  it('should throw error when changing price to 0', () => {
    const product = new Product('123', 'Product 1', 10)
    expect(() => product.changePrice(0)).toThrow('Price must be greater than 0')
  })

  it('should throw error when changing price to negative', () => {
    const product = new Product('123', 'Product 1', 10)
    expect(() => product.changePrice(-10)).toThrow(
      'Price must be greater than 0'
    )
  })
})
