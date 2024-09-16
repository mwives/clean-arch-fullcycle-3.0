import { Address } from './entity/address'
import { Customer } from './entity/customer'
import { Order } from './entity/order'
import { OrderItem } from './entity/order_item'

// Customer aggregate
const customer = new Customer('1', 'John Doe')
const address = new Address('Main St', 123, '12345', 'Springfield')
customer.Address = address
customer.activate()

// Order aggregate
const item1 = new OrderItem('1', 'Product 1', 100)
const item2 = new OrderItem('2', 'Product 2', 200)
const order = new Order('1', customer._id, [item1, item2])
