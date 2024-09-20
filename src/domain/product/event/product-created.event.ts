import { EventInterface } from '../../@shared/event.interface'

export class ProductCreatedEvent implements EventInterface {
  occuredOn: Date
  eventData: any

  constructor(eventData: any) {
    this.occuredOn = new Date()
    this.eventData = eventData
  }
}
