import { Order } from './order'
import { OrderItem } from './order_item'

describe('Order', () => {
  it('should throw error when creating an order without ID', () => {
    expect(() => new Order('', '123', [])).toThrow('ID is required')
  })

  it('should throw error when creating an order without customer ID', () => {
    expect(() => new Order('123', '', [])).toThrow('Customer ID is required')
  })

  it('should throw error when creating an order without items', () => {
    expect(() => new Order('123', '123', [])).toThrow('Items are required')
  })

  it('should calculate total', () => {
    const items = [
      new OrderItem('123', 'p1', 'Product 1', 10, 1),
      new OrderItem('456', 'p2', 'Product 2', 20, 2),
      new OrderItem('789', 'p3', 'Product 3', 30, 3),
    ]
    const order = new Order('123', '123', items)
    expect(order.total()).toBe(140)
  })
})
