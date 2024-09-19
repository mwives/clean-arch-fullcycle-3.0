import { Customer } from '../../../../entity/customer'
import { EventHandlerInterface } from '../../event-handler.interface'
import { EventInterface } from '../../event.interface'

export class SendConsoleLogHandler implements EventHandlerInterface {
  handle(event: EventInterface<Customer>): void {
    console.log(
      `Client address: ${event.eventData.id}, 
      ${event.eventData.name} changed to: ${event.eventData.Address.toString()}`
    )
  }
}
