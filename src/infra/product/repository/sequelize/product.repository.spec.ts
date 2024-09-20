import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from '@infra/product/repository/sequelize/product.model'
import { ProductRepository } from '@infra/product/repository/sequelize/product.repository'
import { Product } from '@product/entity/product'

describe('ProductRepository', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })
    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('1', 'Product 1', 10)

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: '1' } })

    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 1',
      price: 10,
    })
  })

  it('should find a product by ID', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('1', 'Product 1', 10)

    await productRepository.create(product)

    const foundProduct = await productRepository.findById('1')

    expect(foundProduct).toStrictEqual(product)
  })

  it('should find all products', async () => {
    const productRepository = new ProductRepository()
    const product1 = new Product('1', 'Product 1', 10)
    const product2 = new Product('2', 'Product 2', 20)

    await productRepository.create(product1)
    await productRepository.create(product2)

    const foundProducts = await productRepository.findAll()

    expect(foundProducts).toStrictEqual([product1, product2])
  })

  it('should update a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('1', 'Product 1', 10)

    await productRepository.create(product)

    product.changeName('Product 2')
    product.changePrice(20)
    await productRepository.update(product)

    const productModel = await ProductModel.findOne({ where: { id: '1' } })

    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 2',
      price: 20,
    })
  })
})
