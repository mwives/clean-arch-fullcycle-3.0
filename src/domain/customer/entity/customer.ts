import { Address } from '@customer/value-object/address'

export class Customer {
  private _id: string
  private _name: string
  private _address!: Address
  private _rewardPoints = 0
  private _active = false

  constructor(id: string, name: string) {
    this._id = id
    this._name = name
    this.validate()
  }

  get id() {
    return this._id
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
    if (!this._id) {
      throw new Error('ID is required')
    }
    if (!this._name) {
      throw new Error('Name is required')
    }
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
