import { AddressYupValidator } from '@customer/validator/address.yup.validator'
import { Address } from '@customer/value-object/address'
import { ValidatorInterface } from '@shared/validator/validator.interface'

export class AddressValidatorFactory {
  static create(): ValidatorInterface<Address> {
    return new AddressYupValidator()
  }
}
