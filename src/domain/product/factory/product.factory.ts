import { Product } from '@product/entity/product'
import { ProductB } from '@product/entity/product-b'
import { ProductInterface } from '@product/entity/product.interface'
import { v4 as uuid } from 'uuid'

export class ProductFactory {
  static create(type: string, name: string, price: number): ProductInterface {
    const id = uuid()

    if (type === 'a') {
      return new Product(id, name, price)
    }
    if (type === 'b') {
      return new ProductB(id, name, price)
    }
    throw new Error('Invalid type')
  }
}
