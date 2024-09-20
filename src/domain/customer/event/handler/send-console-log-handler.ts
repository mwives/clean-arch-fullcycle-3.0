import { Customer } from '@customer/entity/customer'
import { EventHandlerInterface } from '@shared/event/event-handler.interface'
import { EventInterface } from '@shared/event/event.interface'

export class SendConsoleLogHandler implements EventHandlerInterface {
  handle(event: EventInterface<Customer>): void {
    console.log(
      `Client address: ${event.eventData.id}, 
      ${event.eventData.name} changed to: ${event.eventData.Address.toString()}`
    )
  }
}
