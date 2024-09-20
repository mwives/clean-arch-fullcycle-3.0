import { v4 as uuid } from 'uuid'
import { CustomerRepository } from '../../infra/repository/customer.repository'
import { Address } from '../customer/value-object/address'
import { Customer } from '../customer/entity/customer'
import { CustomerCreatedEvent } from '../event/shared/customer/customer-created.event'
import { SendConsoleLog1Handler } from '../event/shared/customer/handler/send-console-log-1-handler'
import { SendConsoleLog2Handler } from '../event/shared/customer/handler/send-console-log-2-handler'
import { SendConsoleLogHandler } from '../event/shared/customer/handler/send-console-log-handler'
import { EventDispatcher } from '../event/shared/event-dispatcher'
import { EventDispatcherInterface } from '../event/shared/event-dispatcher.interface'
import { CustomerService } from './customer.service'

jest.mock('uuid', () => ({
  v4: jest.fn(),
}))

describe('CustomerService', () => {
  let customerRepository: CustomerRepository
  let customerService: CustomerService
  let eventDispatcher: EventDispatcherInterface

  beforeEach(() => {
    customerRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    } as unknown as CustomerRepository
    eventDispatcher = {
      notify: jest.fn(),
    } as unknown as EventDispatcherInterface

    customerService = new CustomerService(customerRepository, eventDispatcher)
  })

  describe('create', () => {
    it('should create a customer and dispatch an event', async () => {
      const costumerId = 'uuid'
      const costumerName = 'John Doe'
      ;(uuid as jest.MockedFunction<typeof uuid>).mockReturnValue(costumerId)
      jest.useFakeTimers().setSystemTime(new Date())
      jest.spyOn(eventDispatcher, 'notify')

      const result = await customerService.create(costumerName)

      const expectedCustomer = new Customer(costumerId, costumerName)
      expect(customerRepository.create).toHaveBeenCalledWith(expectedCustomer)
      expect(eventDispatcher.notify).toHaveBeenCalledWith(
        new CustomerCreatedEvent(expectedCustomer)
      )

      expect(result).toEqual(expectedCustomer)
    })

    it('should call the handlers when the event is dispatched', async () => {
      const costumerId = 'uuid'
      const costumerName = 'John Doe'
      ;(uuid as jest.MockedFunction<typeof uuid>).mockReturnValue(costumerId)
      jest.useFakeTimers().setSystemTime(new Date())

      const handler1 = new SendConsoleLog1Handler()
      const handler2 = new SendConsoleLog2Handler()

      jest.spyOn(handler1, 'handle')
      jest.spyOn(handler2, 'handle')

      const eventDispatcher = new EventDispatcher()
      eventDispatcher.register('CustomerCreatedEvent', handler1)
      eventDispatcher.register('CustomerCreatedEvent', handler2)
      const customerService = new CustomerService(
        customerRepository,
        eventDispatcher
      )

      await customerService.create(costumerName)

      expect(handler1.handle).toHaveBeenCalled()
      expect(handler2.handle).toHaveBeenCalled()
    })
  })

  describe('changeAddress', () => {
    it('should change the address of the customer and dispatch an event', async () => {
      const customerId = '123'
      const customer = new Customer(customerId, 'John Doe')
      const newAddress = new Address('Street 1', 12345, '45678', 'Springfield')
      ;(customerRepository.findById as jest.Mock).mockResolvedValue(customer)
      ;(customerRepository.update as jest.Mock).mockResolvedValue(null)

      jest.spyOn(eventDispatcher, 'notify')

      const result = await customerService.changeAddress(customerId, newAddress)

      expect(customerRepository.findById).toHaveBeenCalledWith(customerId)
      expect(customerRepository.update).toHaveBeenCalledWith(customer)
      expect(result).toEqual(customer)
      expect(eventDispatcher.notify).toHaveBeenCalledWith(
        new CustomerCreatedEvent(customer)
      )
    })

    it('should change the address of the customer and call the handlers', async () => {
      const customerId = '123'
      const customer = new Customer(customerId, 'John Doe')
      const newAddress = new Address('Street 1', 12345, '45678', 'Springfield')
      ;(customerRepository.findById as jest.Mock).mockResolvedValue(customer)
      ;(customerRepository.update as jest.Mock).mockResolvedValue(null)

      const handler = new SendConsoleLogHandler()

      jest.spyOn(handler, 'handle')

      const eventDispatcher = new EventDispatcher()
      eventDispatcher.register('CustomerAddressChangedEvent', handler)
      const customerService = new CustomerService(
        customerRepository,
        eventDispatcher
      )

      await customerService.changeAddress(customerId, newAddress)

      expect(handler.handle).toHaveBeenCalled()
    })
  })
})
