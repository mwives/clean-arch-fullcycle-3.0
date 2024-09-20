import { EventInterface } from '@shared/event/event.interface'

export class CustomerAddressChangedEvent implements EventInterface {
  occuredOn: Date
  eventData: any

  constructor(eventData: any) {
    this.occuredOn = new Date()
    this.eventData = eventData
  }
}
