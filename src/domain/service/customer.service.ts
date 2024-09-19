import { v4 as uuid } from 'uuid'
import { CustomerRepository } from '../../infra/repository/customer.repository'
import { Address } from '../entity/address'
import { Customer } from '../entity/customer'
import { CustomerAddressChangedEvent } from '../event/shared/customer/customer-address-changed.event'
import { CustomerCreatedEvent } from '../event/shared/customer/customer-created.event'
import { EventDispatcherInterface } from '../event/shared/event-dispatcher.interface'

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
