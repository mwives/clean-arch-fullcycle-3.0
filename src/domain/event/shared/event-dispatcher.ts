import { EventDispatcherInterface } from './event-dispatcher.interface'
import { EventHandlerInterface } from './event-handler.interface'
import { EventInterface } from './event.interface'

export class EventDispatcher implements EventDispatcherInterface {
  private handlers: { [eventName: string]: EventHandlerInterface[] } = {}

  getEventHandler(eventName: string): EventHandlerInterface[] {
    return this.handlers[eventName]
  }

  register(event: string, handler: EventHandlerInterface): void {
    if (!this.handlers[event]) {
      this.handlers[event] = []
    }

    this.handlers[event].push(handler)
  }

  unregister(event: string, handler: EventHandlerInterface): void {
    if (!this.handlers[event]) {
      return
    }

    this.handlers[event] = this.handlers[event].filter(
      (registeredHandler) => registeredHandler !== handler
    )
  }

  unregisterAll(): void {
    this.handlers = {}
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name

    if (!this.handlers[eventName]) {
      return
    }

    this.handlers[eventName].forEach((handler) => handler.handle(event))
  }
}
