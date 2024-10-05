import * as yup from 'yup'

import { Product } from '@product/entity/product'
import { ValidatorInterface } from '@shared/validator/validator.interface'

export class ProductYupValidator implements ValidatorInterface<Product> {
  validate(entity: Product): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().required('ID is required'),
        name: yup.string().required('Name is required'),
        price: yup
          .number()
          .moreThan(0, 'Price must be greater than 0')
          .required('Price is required'),
      })

      schema.validateSync(entity, { abortEarly: false })
    } catch (err) {
      ;(err as yup.ValidationError).errors.forEach((error) => {
        entity.notification.addError({
          context: 'product',
          message: error,
        })
      })
    }
  }
}
