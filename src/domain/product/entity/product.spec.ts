import { Product } from '@product/entity/product'
import { NotificationError } from '@shared/notification/notification.error'

describe('Product', () => {
  it('should throw NotificationError when creating a product without ID', () => {
    try {
      new Product('', 'Product 1', 10)
    } catch (err) {
      expect(err).toBeInstanceOf(NotificationError)
      expect((err as NotificationError).message).toBe('product: ID is required')
    }
  })

  it('should throw NotificationError when creating a product with negative price', () => {
    try {
      new Product('123', 'Product 1', -10)
    } catch (err) {
      expect(err).toBeInstanceOf(NotificationError)
      expect((err as NotificationError).message).toBe(
        'product: Price must be greater than 0'
      )
    }
  })

  it('should throw NotificationError when multiple errors occur', () => {
    try {
      new Product('', '', 0)
    } catch (err) {
      expect(err).toBeInstanceOf(NotificationError)
      expect((err as NotificationError).message).toBe(
        'product: ID is required, product: Name is required, product: Price must be greater than 0'
      )
    }
  })

  it('should change name', () => {
    const product = new Product('123', 'Product 1', 10)
    product.changeName('Product 2')
    expect(product.name).toBe('Product 2')
  })

  it('should throw error when changing name to empty', () => {
    const product = new Product('123', 'Product 1', 10)
    try {
      product.changeName('')
    } catch (err) {
      expect(err).toBeInstanceOf(NotificationError)
      expect((err as NotificationError).message).toBe(
        'product: Name is required'
      )
    }
  })

  it('should change price', () => {
    const product = new Product('123', 'Product 1', 10)
    product.changePrice(20)
    expect(product.price).toBe(20)
  })

  it('should throw error when changing price to 0', () => {
    const product = new Product('123', 'Product 1', 10)
    try {
      product.changePrice(0)
    } catch (err) {
      expect(err).toBeInstanceOf(NotificationError)
      expect((err as NotificationError).message).toBe(
        'product: Price must be greater than 0'
      )
    }
  })

  it('should throw error when changing price to negative', () => {
    const product = new Product('123', 'Product 1', 10)
    try {
      product.changePrice(-10)
    } catch (err) {
      expect(err).toBeInstanceOf(NotificationError)
      expect((err as NotificationError).message).toBe(
        'product: Price must be greater than 0'
      )
    }
  })
})
