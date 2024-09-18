import { OrderItem } from './order-item'

describe('OrderItem', () => {
  it('should throw error when creating an order item without ID', () => {
    expect(() => new OrderItem('', 'p1', 'Product 1', 10, 1)).toThrow(
      'ID is required'
    )
  })

  it('should throw error when creating an order item without product ID', () => {
    expect(() => new OrderItem('123', '', 'Product 1', 10, 1)).toThrow(
      'Product ID is required'
    )
  })

  it('should throw error when creating an order item without name', () => {
    expect(() => new OrderItem('123', 'p1', '', 10, 1)).toThrow(
      'Name is required'
    )
  })

  it('should throw error when creating an order item with price less than or equal to 0', () => {
    expect(() => new OrderItem('123', 'p1', 'Product 1', 0, 1)).toThrow(
      'Price must be greater than 0'
    )
  })

  it('should throw error when creating an order item with quantity less than or equal to 0', () => {
    expect(() => new OrderItem('123', 'p1', 'Product 1', 10, 0)).toThrow(
      'Quantity must be greater than 0'
    )
  })

  it('should calculate order item total', () => {
    const orderItem = new OrderItem('123', 'p1', 'Product 1', 10, 2)
    expect(orderItem.orderItemTotal()).toBe(20)
  })
})
