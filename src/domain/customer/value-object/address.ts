import { AddressValidatorFactory } from '@customer/factory/address.validator.factory'

// Address is a value object
export class Address {
  // VOs don't have ID
  _street: string
  _number: number
  _zip: string
  _city: string

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street
    this._number = number
    this._zip = zip
    this._city = city

    this.validate()
  }

  get street() {
    return this._street
  }

  get number() {
    return this._number
  }

  get zip() {
    return this._zip
  }

  get city() {
    return this._city
  }

  validate() {
    AddressValidatorFactory.create().validate(this)
  }

  toString() {
    return `${this._street} ${this._number}, ${this._zip} ${this._city}`
  }
}
