import { Customer } from '@customer/entity/customer'
import { Address } from '@customer/value-object/address'
import { v4 as uuid } from 'uuid'

export class CustomerFactory {
  static create(name: string): Customer {
    return new Customer(uuid(), name)
  }

  static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name)
    customer.changeAddress(address)
    return customer
  }
}
