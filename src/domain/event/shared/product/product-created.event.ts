import { EventInterface } from '../event.interface'

export class ProductCreatedEvent implements EventInterface {
  dataTimeOccurrence: Date
  eventData: any

  constructor(eventData: any) {
    this.dataTimeOccurrence = new Date()
    this.eventData = eventData
  }
}
