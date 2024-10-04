import { app, sequelize } from '@infra/api/express'
import request from 'supertest'

describe('Product E2E', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  describe('POST /products', () => {
    it('should create a product', async () => {
      const response = await request(app).post('/products').send({
        name: 'any_name',
        price: 10,
      })

      expect(response.status).toBe(201)
      expect(response.body).toEqual({
        id: expect.any(String),
        name: 'any_name',
        price: 10,
      })
    })

    it('should not create a product with invalid data', async () => {
      const response = await request(app).post('/products').send({
        name: 'any_name',
        price: null,
      })

      expect(response.status).toBe(500)
    })
  })
})
