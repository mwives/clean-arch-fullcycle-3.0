import { Customer } from '@customer/entity/customer'
import { CustomerAddressChangedEvent } from '@customer/event/customer-address-changed.event'
import { CustomerCreatedEvent } from '@customer/event/customer-created.event'
import { Address } from '@customer/value-object/address'
import { CustomerRepository } from '@infra/customer/repository/sequelize/customer.repository'
import { EventDispatcherInterface } from '@shared/event/event-dispatcher.interface'
import { v4 as uuid } from 'uuid'

export class CustomerService {
  constructor(
    private customerRepository: CustomerRepository,
    private eventDispatcher: EventDispatcherInterface
  ) {}

  async create(name: string): Promise<Customer> {
    const customer = new Customer(uuid(), name)
    await this.customerRepository.create(customer)
    this.eventDispatcher.notify(new CustomerCreatedEvent(customer))
    return customer
  }

  async changeAddress(id: string, address: Address): Promise<Customer> {
    const customer = await this.customerRepository.findById(id)
    customer.changeAddress(address)
    await this.customerRepository.update(customer)
    this.eventDispatcher.notify(new CustomerAddressChangedEvent(customer))
    return customer
  }
}
