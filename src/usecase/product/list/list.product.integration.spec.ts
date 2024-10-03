import { ProductModel } from '@infra/product/repository/sequelize/product.model'
import { Sequelize } from 'sequelize-typescript'

describe('List Product Integration Test', () => {
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

  describe('execute', () => {
    it('should list products', async () => {
      const product = ProductModel.build({ name: 'any_name', price: 9.9 })
      await product.save()

      const products = await ProductModel.findAll()

      expect(products).toHaveLength(1)
      expect(products[0].name).toBe('any_name')
      expect(products[0].price).toBe(9.9)
    })
  })
})
