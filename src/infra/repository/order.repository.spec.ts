import { Sequelize } from 'sequelize-typescript'
import { Address } from '../../domain/entity/address'
import { Customer } from '../../domain/entity/customer'
import { Order } from '../../domain/entity/order'
import { OrderItem } from '../../domain/entity/order-item'
import { Product } from '../../domain/entity/product'
import { CustomerModel } from '../db/sequelize/model/customer.model'
import { OrderItemModel } from '../db/sequelize/model/order-item.model'
import { OrderModel } from '../db/sequelize/model/order.model'
import { ProductModel } from '../db/sequelize/model/product.model'
import { CustomerRepository } from './customer.repository'
import { OrderRepository } from './order.repository'
import { ProductRepository } from './product.repository'

describe('OrderRepository', () => {
  let sequelize: Sequelize
  let customerRepository: CustomerRepository
  let productRepository: ProductRepository
  let orderRepository: OrderRepository

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ])
    await sequelize.sync()

    customerRepository = new CustomerRepository()
    productRepository = new ProductRepository()
    orderRepository = new OrderRepository()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  async function createCustomer(): Promise<Customer> {
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Main St', 1, '12345', 'Springfield')
    customer.changeAddress(address)
    await customerRepository.create(customer)
    return customer
  }

  async function createProduct(id: string): Promise<Product> {
    const product = new Product(id, `Product ${id}}`, 10)
    await productRepository.create(product)
    return product
  }

  async function createOrder(
    id: string,
    customerId: string,
    orderItems: OrderItem[]
  ): Promise<Order> {
    const order = new Order(id, customerId, orderItems)
    await orderRepository.create(order)
    return order
  }

  it('should create a new order', async () => {
    const customer = await createCustomer()
    const product = await createProduct('123')

    const orderItem = new OrderItem(
      '1',
      product.id,
      product.name,
      product.price,
      2
    )

    const order = await createOrder('123', customer.id, [orderItem])

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '123',
          product_id: '123',
        },
      ],
    })
  })

  it('should find an order by ID', async () => {
    const customer = await createCustomer()
    const product = await createProduct('123')

    const orderItems = [
      new OrderItem('1', product.id, product.name, product.price, 2),
      new OrderItem('2', product.id, product.name, product.price, 10),
    ]
    const order = await createOrder('123', customer.id, orderItems)

    const orderResult = await orderRepository.findById(order.id)

    expect(order).toStrictEqual(orderResult)
  })

  it('should throw an error when order is not found', async () => {
    await expect(orderRepository.findById('123')).rejects.toThrow(
      'Order not found'
    )
  })

  it('should find all orders', async () => {
    const customer = await createCustomer()
    const product = await createProduct('123')

    const orderItem1 = new OrderItem(
      '1',
      product.id,
      product.name,
      product.price,
      2
    )
    const orderItem2 = new OrderItem(
      '2',
      product.id,
      product.name,
      product.price,
      10
    )
    const order1 = await createOrder('123', customer.id, [orderItem1])
    const order2 = await createOrder('124', customer.id, [orderItem2])

    const orders = await orderRepository.findAll()

    expect(orders).toHaveLength(2)
    expect(orders).toContainEqual(order1)
    expect(orders).toContainEqual(order2)
  })

  // it('should update an order', async () => {
  //   const customer = await createCostumer()
  //   const product = await createProduct('123')

  //   const orderItem1 = new OrderItem(
  //     '1',
  //     product.id,
  //     product.name,
  //     product.price,
  //     2
  //   )
  //   const orderItem2 = new OrderItem(
  //     '2',
  //     product.id,
  //     product.name,
  //     product.price,
  //     10
  //   )

  //   const order = await createOrder('123', customer.id, [
  //     orderItem1,
  //     orderItem2,
  //   ])

  //   // Make changes in the order
  //   order.removeItem(orderItem1.id)
  //   order.addItem(
  //     new OrderItem('3', product.id, product.name, product.price, 30)
  //   )
  //   orderItem2.changeQuantity(5)
  //   await orderRepository.update(order)

  //   const orderModel = await OrderModel.findOne({
  //     where: { id: order.id },
  //     include: ['items'],
  //   })

  //   expect(orderModel.toJSON()).toStrictEqual({
  //     id: '123',
  //     customer_id: '123',
  //     total: order.total(),
  //     items: [
  //       {
  //         id: orderItem2.id,
  //         name: orderItem2.name,
  //         price: orderItem2.price,
  //         quantity: orderItem2.quantity,
  //         order_id: '123',
  //         product_id: '123',
  //       },
  //       {
  //         id: '3',
  //         name: product.name,
  //         price: product.price,
  //         quantity: 30,
  //         order_id: '123',
  //         product_id: '123',
  //       },
  //     ],
  //   })
  // })
  describe('update', () => {
    it('should update an order by removing an item', async () => {
      const customer = await createCustomer()
      const product = await createProduct('123')

      const orderItem1 = new OrderItem(
        '1',
        product.id,
        product.name,
        product.price,
        2
      )
      const orderItem2 = new OrderItem(
        '2',
        product.id,
        product.name,
        product.price,
        10
      )
      const order = await createOrder('123', customer.id, [
        orderItem1,
        orderItem2,
      ])

      // Remove an item
      order.removeItem(orderItem1.id)
      await orderRepository.update(order)

      const orderModel = await OrderModel.findOne({
        where: { id: order.id },
        include: ['items'],
      })

      expect(orderModel.toJSON()).toStrictEqual({
        id: '123',
        customer_id: '123',
        total: order.total(),
        items: [
          {
            id: orderItem2.id,
            name: orderItem2.name,
            price: orderItem2.price,
            quantity: orderItem2.quantity,
            order_id: '123',
            product_id: '123',
          },
        ],
      })
    })

    it('should update an order by adding an item', async () => {
      const customer = await createCustomer()
      const product = await createProduct('123')

      const orderItem1 = new OrderItem(
        '1',
        product.id,
        product.name,
        product.price,
        2
      )
      const orderItem2 = new OrderItem(
        '2',
        product.id,
        product.name,
        product.price,
        10
      )
      const order = await createOrder('123', customer.id, [orderItem1])

      // Add a new item
      order.addItem(orderItem2)
      await orderRepository.update(order)

      const orderModel = await OrderModel.findOne({
        where: { id: order.id },
        include: ['items'],
      })

      expect(orderModel.toJSON()).toStrictEqual({
        id: '123',
        customer_id: '123',
        total: order.total(),
        items: [
          {
            id: orderItem1.id,
            name: orderItem1.name,
            price: orderItem1.price,
            quantity: orderItem1.quantity,
            order_id: '123',
            product_id: '123',
          },
          {
            id: orderItem2.id,
            name: orderItem2.name,
            price: orderItem2.price,
            quantity: orderItem2.quantity,
            order_id: '123',
            product_id: '123',
          },
        ],
      })
    })

    it('should update the quantity of an item', async () => {
      const customer = await createCustomer()
      const product = await createProduct('123')

      const orderItem1 = new OrderItem(
        '1',
        product.id,
        product.name,
        product.price,
        2
      )
      const order = await createOrder('123', customer.id, [orderItem1])

      // Change the quantity of an item
      orderItem1.changeQuantity(5)
      await orderRepository.update(order)

      const orderModel = await OrderModel.findOne({
        where: { id: order.id },
        include: ['items'],
      })

      expect(orderModel.toJSON()).toStrictEqual({
        id: '123',
        customer_id: '123',
        total: order.total(),
        items: [
          {
            id: orderItem1.id,
            name: orderItem1.name,
            price: orderItem1.price,
            quantity: orderItem1.quantity,
            order_id: '123',
            product_id: '123',
          },
        ],
      })
    })
  })
})
