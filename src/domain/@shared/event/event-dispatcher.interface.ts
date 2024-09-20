import { EventHandlerInterface } from '@shared/event/event-handler.interface'
import { EventInterface } from '@shared/event/event.interface'

export interface EventDispatcherInterface {
  register(event: string, handler: EventHandlerInterface): void
  unregister(event: string, handler: EventHandlerInterface): void
  unregisterAll(): void
  notify(event: EventInterface): void
}
