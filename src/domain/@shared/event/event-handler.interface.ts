import { EventInterface } from '@shared/event/event.interface'

export interface EventHandlerInterface<
  T extends EventInterface = EventInterface
> {
  handle(event: T): void
}
