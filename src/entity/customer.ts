class Customer {
  _id: string
  _name: string
  _address = ''
  _active = false

  constructor(id: string, name: string) {
    this._id = id
    this._name = name
    this.validate()
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
