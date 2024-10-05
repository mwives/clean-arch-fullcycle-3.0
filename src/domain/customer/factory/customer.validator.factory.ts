import { Customer } from '@customer/entity/customer'
import { CustomerYupValidator } from '@customer/validator/customer.yup.validator'
import { ValidatorInterface } from '@shared/validator/validator.interface'

export class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerYupValidator()
  }
}
