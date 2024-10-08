import { Order } from '@checkout/entity/order'
import { OrderItem } from '@checkout/entity/order-item'
import { OrderService } from '@checkout/service/order.service'
import { Customer } from '@customer/entity/customer'

describe('OrderService', () => {
  it('should get total price of all orders', () => {
    const item1 = new OrderItem('i1', 'p1', 'Item 1', 100, 1)
    const item2 = new OrderItem('i2', 'p2', 'Item 2', 200, 2)
    const order1 = new Order('o1', 'c1', [item1])
    const order2 = new Order('o2', 'c2', [item2])

    const totalPrice = OrderService.getTotalPrice([order1, order2])

    expect(totalPrice).toBe(500)
  })

  it('should place an order', () => {
    const customer = new Customer('c1', 'Customer 1')
    const item1 = new OrderItem('i1', 'p1', 'Item 1', 10, 1)

    const order = OrderService.placeOrder(customer, [item1])

    expect(customer.rewardPoints).toBe(5)
    expect(order.total()).toBe(10)
  })
})
