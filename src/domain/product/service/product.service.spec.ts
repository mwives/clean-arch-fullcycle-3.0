import { Product } from '../../entity/product'
import { ProductService } from './product.service'

describe('ProductService', () => {
  it('should change the price of all products', () => {
    const product1 = new Product('p1', 'Product 1', 10)
    const product2 = new Product('p2', 'Product 2', 20)
    const products = [product1, product2]

    ProductService.increasePrice(products, 10)

    expect(product1.price).toBe(11)
    expect(product2.price).toBe(22)
  })
})
