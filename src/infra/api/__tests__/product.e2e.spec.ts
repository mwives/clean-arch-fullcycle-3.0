import { app, sequelize } from '@infra/api/express'
import request from 'supertest'

describe('Product E2E', () => {
  const productData = {
    name: 'any_name',
    price: 10,
  }

  const createProduct = async (data = productData) => {
    return request(app).post('/products').send(data)
  }

  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  describe('POST /products', () => {
    it('should create a product', async () => {
      const response = await createProduct()

      expect(response.status).toBe(201)
      expect(response.body).toEqual({
        id: expect.any(String),
        name: 'any_name',
        price: 10,
      })
    })

    it('should not create a product with invalid data', async () => {
      const response = await createProduct({ ...productData, price: null })

      expect(response.status).toBe(500)
    })
  })

  describe('GET /products', () => {
    it('should list all products', async () => {
      const productData1 = { ...productData, name: 'any_name1' }
      const productData2 = { ...productData, name: 'any_name2' }

      const createResponse1 = await createProduct(productData1)
      const createResponse2 = await createProduct(productData2)

      expect(createResponse1.status).toBe(201)
      expect(createResponse2.status).toBe(201)

      const response = await request(app).get('/products')

      expect(response.status).toBe(200)
      expect(response.body.products.length).toBe(2)
    })
  })
})
