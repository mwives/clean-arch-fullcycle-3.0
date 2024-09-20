import { Order } from '@checkout/entity/order'
import { OrderItem } from '@checkout/entity/order-item'

export type OrderFactoryProps = {
  id: string
  customerId: string
  items: OrderItemProps[]
}

type OrderItemProps = {
  id: string
  productId: string
  name: string
  quantity: number
  price: number
}

export class OrderFactory {
  static create(orderProps: OrderFactoryProps): Order {
    const items = orderProps.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.productId,
          item.name,
          item.price,
          item.quantity
        )
    )
    return new Order(orderProps.id, orderProps.customerId, items)
  }
}
