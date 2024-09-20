import { EventInterface } from '@shared/event/event.interface'

export class CustomerCreatedEvent implements EventInterface {
  occuredOn: Date
  eventData: any

  constructor(eventData: any) {
    this.occuredOn = new Date()
    this.eventData = eventData
  }
}
