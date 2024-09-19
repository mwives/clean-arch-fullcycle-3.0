import { EventDispatcher } from './event-dispatcher'
import { SendEmailWhenProductIsCreatedHandler } from './product/handler/send-email-when-product-is-created.handler'
import { ProductCreatedEvent } from './product/product-created.event'

describe('EventDispatcher', () => {
  it('should register event handler', () => {
    const dispatcher = new EventDispatcher()
    const handler = new SendEmailWhenProductIsCreatedHandler()

    dispatcher.register('ProductCreatedEvent', handler)

    expect(dispatcher.getEventHandler('ProductCreatedEvent')).toStrictEqual([
      handler,
    ])
  })

  it('should unregister event handler', () => {
    const dispatcher = new EventDispatcher()
    const handler = new SendEmailWhenProductIsCreatedHandler()

    dispatcher.register('ProductCreatedEvent', handler)
    dispatcher.unregister('ProductCreatedEvent', handler)

    expect(dispatcher.getEventHandler('ProductCreatedEvent')).toStrictEqual([])
  })

  it('should unregister all event handlers', () => {
    const dispatcher = new EventDispatcher()
    const handler = new SendEmailWhenProductIsCreatedHandler()

    dispatcher.register('ProductCreatedEvent', handler)
    dispatcher.unregisterAll()

    expect(dispatcher.getEventHandler('ProductCreatedEvent')).toBeUndefined()
  })

  it('should notify event handlers', () => {
    const dispatcher = new EventDispatcher()
    const handler = new SendEmailWhenProductIsCreatedHandler()
    const spyEventHandler = jest.spyOn(handler, 'handle')

    dispatcher.register('ProductCreatedEvent', handler)

    const productCreatedEvent = new ProductCreatedEvent({
      name: 'Product',
      price: 100,
    })

    dispatcher.notify(productCreatedEvent)

    expect(spyEventHandler).toHaveBeenCalledWith(productCreatedEvent)
  })
})
