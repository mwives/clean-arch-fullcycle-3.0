import { Product } from '@product/entity/product'
import { ProductInterface } from '@product/entity/product.interface'
import { ProductRepositoryInterface } from '@product/repository/product-repository.interface'
import { ProductModel } from './product.model'

export class ProductRepository implements ProductRepositoryInterface {
  async create(entity: ProductInterface): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    })
  }

  async findById(id: string): Promise<ProductInterface> {
    const productModel = await ProductModel.findOne({ where: { id } })

    if (!productModel) {
      throw new Error('Product not found')
    }

    return new Product(productModel.id, productModel.name, productModel.price)
  }

  async findAll(): Promise<ProductInterface[]> {
    const productModels = await ProductModel.findAll()

    return productModels.map(
      (productModel) =>
        new Product(productModel.id, productModel.name, productModel.price)
    )
  }

  async update(entity: ProductInterface): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      { where: { id: entity.id } }
    )
  }
}
