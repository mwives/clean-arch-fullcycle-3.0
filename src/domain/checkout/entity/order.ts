import { OrderItem } from '@checkout/entity/order-item'

export class Order {
  private _id: string
  private _customerId: string
  private _items: OrderItem[]

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id
    this._customerId = customerId
    this._items = items
    this.validate()
  }

  get id(): string {
    return this._id
  }

  get customerId(): string {
    return this._customerId
  }

  get items(): OrderItem[] {
    return this._items
  }

  get status(): string {
    return 'pending'
  }

  validate(): void {
    if (!this._id) {
      throw new Error('ID is required')
    }
    if (!this._customerId) {
      throw new Error('Customer ID is required')
    }
    if (!this._items || this._items.length === 0) {
      throw new Error('Items are required')
    }
  }

  addItem(item: OrderItem): void {
    this._items.push(item)
  }

  removeItem(id: string): void {
    this._items = this._items.filter((item) => item.id !== id)
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0)
  }
}
