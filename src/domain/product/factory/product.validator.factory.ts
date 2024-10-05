import { Product } from '@product/entity/product'
import { ProductYupValidator } from '@product/validator/product.yup.validator'
import { ValidatorInterface } from '@shared/validator/validator.interface'

export class ProductValidatorFactory {
  static create(): ValidatorInterface<Product> {
    return new ProductYupValidator()
  }
}
