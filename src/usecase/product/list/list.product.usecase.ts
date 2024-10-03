import { ProductInterface } from '@product/entity/product.interface'
import { ProductRepositoryInterface } from '@product/repository/product-repository.interface'
import { InputListProductDto, OutputListProductDto } from './list.product.dto'

export class ListProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll()
    return OutputMapper.toDto(products)
  }
}

class OutputMapper {
  static toDto(products: ProductInterface[]): OutputListProductDto {
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    }
  }
}
