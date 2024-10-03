import { ProductInterface } from '@product/entity/product.interface'
import { RepositoryInterface } from '@shared/repository/repository-interface'

export interface ProductRepositoryInterface
  extends RepositoryInterface<ProductInterface> {}
