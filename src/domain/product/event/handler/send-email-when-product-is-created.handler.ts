import { EventHandlerInterface } from '../../../@shared/event-handler.interface'
import { ProductCreatedEvent } from '../product-created.event'

export class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface
{
  handle(event: ProductCreatedEvent): void {
    console.log('Send email when product is created')
  }
}
