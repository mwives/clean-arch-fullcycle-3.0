import * as yup from 'yup'

import { Address } from '@customer/value-object/address'
import { ValidatorInterface } from '@shared/validator/validator.interface'

export class AddressYupValidator implements ValidatorInterface<Address> {
  validate(entity: Address): void {
    const schema = yup.object().shape({
      street: yup.string().required('Street is required'),
      number: yup.number().required('Number is required'),
      zip: yup.string().required('Zip is required'),
      city: yup.string().required('City is required'),
    })
    schema.validateSync(entity)
  }
}
