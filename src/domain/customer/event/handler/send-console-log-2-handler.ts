import { EventHandlerInterface } from '@shared/event/event-handler.interface'
import { CustomerCreatedEvent } from '@customer/event/customer-created.event'

export class SendConsoleLog2Handler implements EventHandlerInterface {
  handle(event: CustomerCreatedEvent): void {
    console.log('This is the second console.log from event CustomerCreated')
  }
}
