import { EventHandlerInterface } from '../../event-handler.interface'
import { CustomerCreatedEvent } from '../customer-created.event'

export class SendConsoleLog1Handler implements EventHandlerInterface {
  handle(event: CustomerCreatedEvent): void {
    console.log('This is the first console.log from event CustomerCreated')
  }
}
