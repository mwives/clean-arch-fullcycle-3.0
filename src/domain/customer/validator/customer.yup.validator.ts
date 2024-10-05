import * as yup from 'yup'

import { Customer } from '@customer/entity/customer'
import { ValidatorInterface } from '@shared/validator/validator.interface'

export class CustomerYupValidator implements ValidatorInterface<Customer> {
  validate(entity: Customer): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().required('ID is required'),
        name: yup.string().required('Name is required'),
      })

      schema.validateSync(entity, { abortEarly: false })
    } catch (err) {
      ;(err as yup.ValidationError).errors.forEach((error) => {
        entity.notification.addError({
          context: 'customer',
          message: error,
        })
      })
    }
  }
}
