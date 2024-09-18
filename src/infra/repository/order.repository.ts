import { Op } from 'sequelize'
import { Order } from '../../domain/entity/order'
import { OrderItem } from '../../domain/entity/order-item'
import { OrderRepositoryInterface } from '../../domain/repository/order-repository.interface'
import { OrderItemModel } from '../db/sequelize/model/order-item.model'
import { OrderModel } from '../db/sequelize/model/order.model'
import { ProductModel } from '../db/sequelize/model/product.model'

export class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          product_id: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    )
  }

  async findById(id: string): Promise<Order> {
    let orderModel: OrderModel
    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        include: [
          {
            model: OrderItemModel,
            include: [{ model: ProductModel }],
          },
        ],
        rejectOnEmpty: true,
      })
    } catch (err) {
      throw new Error('Order not found')
    }

    const orderItems = orderModel.items.map(
      (orderItem) =>
        new OrderItem(
          orderItem.id,
          orderItem.product_id,
          orderItem.product.name,
          orderItem.product.price,
          orderItem.quantity
        )
    )
    const order = new Order(id, orderModel.customer_id, orderItems)

    return order
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [
        {
          model: OrderItemModel,
          include: [
            {
              model: ProductModel,
            },
          ],
        },
      ],
    })

    return orderModels.map((orderModel) => {
      const orderItemModels = orderModel.items.map(
        (orderItem) =>
          new OrderItem(
            orderItem.id,
            orderItem.product_id,
            orderItem.product.name,
            orderItem.product.price,
            orderItem.quantity
          )
      )
      const order = new Order(
        orderModel.id,
        orderModel.customer_id,
        orderItemModels
      )
      return order
    })
  }

  async update(entity: Order): Promise<void> {
    const transaction = await OrderModel.sequelize.transaction()

    try {
      // Update order
      await OrderModel.update(
        {
          customer_id: entity.customerId,
          total: entity.total(),
        },
        {
          where: { id: entity.id },
        }
      )

      // Bulk delete items not present in the entity
      await OrderItemModel.destroy({
        where: {
          order_id: entity.id,
          id: { [Op.notIn]: entity.items.map((item) => item.id) },
        },
      })

      // Update or create order items
      for (const item of entity.items) {
        const orderItemModel = {
          id: item.id,
          product_id: item.productId,
          order_id: entity.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        }
        await OrderItemModel.upsert(orderItemModel, { transaction })
      }

      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
}
