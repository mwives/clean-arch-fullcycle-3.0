import { CustomerValidatorFactory } from '@customer/factory/customer.validator.factory'
import { Address } from '@customer/value-object/address'
import { Entity } from '@shared/entity/entity.abstract'
import { NotificationError } from '@shared/notification/notification.error'

export class Customer extends Entity {
  private _name: string
  private _address!: Address
  private _rewardPoints = 0
  private _active = false

  constructor(id: string, name: string) {
    super()
    this._id = id
    this._name = name
    this.validate()

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.errors)
    }
  }

  get name() {
    return this._name
  }

  get address() {
    return this._address
  }

  get rewardPoints() {
    return this._rewardPoints
  }

  // Entities should always self-validate
  validate() {
    CustomerValidatorFactory.create().validate(this)
  }

  changeName(name: string) {
    this._name = name
    this.validate() // Guarantee that a customer always has a name
  }

  changeAddress(address: Address) {
    this._address = address
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points
  }

  isActive(): boolean {
    return this._active
  }

  activate() {
    // Business rule: Address is required to activate customer
    if (!this._address) {
      throw new Error('Address is required to activate customer')
    }
    this._active = true
  }

  deactivate() {
    this._active = false
  }
}
