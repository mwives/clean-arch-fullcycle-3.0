import {
  OrderFactory,
  OrderFactoryProps,
} from '@checkout/factory/order.factory'
import { v4 as uuid } from 'uuid'

describe('OrderFactory', () => {
  describe('create', () => {
    it('should create an order instance', () => {
      const orderProps: OrderFactoryProps = {
        id: uuid(),
        customerId: uuid(),
        items: [
          {
            id: uuid(),
            productId: uuid(),
            name: 'Product A',
            quantity: 2,
            price: 10,
          },
        ],
      }

      const order = OrderFactory.create(orderProps)

      expect(order.id).toEqual(orderProps.id)
      expect(order.customerId).toEqual(orderProps.customerId)
      expect(order.items.length).toBe(1)
    })
  })
})
