import { Entity } from '@shared/entity/entity.abstract'
import { ProductInterface } from './product.interface'
import { NotificationError } from '@shared/notification/notification.error'
import { ProductValidatorFactory } from '@product/factory/product.validator.factory'

export class Product extends Entity implements ProductInterface {
  private _name: string
  private _price: number

  constructor(id: string, name: string, price: number) {
    super()
    this._id = id
    this._name = name
    this._price = price
    this.validate()

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors)
    }
  }

  get name() {
    return this._name
  }

  get price() {
    return this._price
  }

  validate() {
    ProductValidatorFactory.create().validate(this)
  }

  changeName(name: string) {
    this._name = name
    this.validate()
  }

  changePrice(price: number) {
    this._price = price
    this.validate()
  }
}
