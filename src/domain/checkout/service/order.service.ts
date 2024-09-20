import { Order } from '@checkout/entity/order'
import { OrderItem } from '@checkout/entity/order-item'
import { Customer } from '@customer/entity/customer'
import { v4 as uuid } from 'uuid'

export class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error('An order must have at least one item')
    }

    const order = new Order(uuid(), customer.id, items)
    customer.addRewardPoints(order.total() / 2)
    return order
  }

  static getTotalPrice(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total(), 0)
  }
}
