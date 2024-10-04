import { app, sequelize } from '@infra/api/express'
import request from 'supertest'

describe('Customer E2E', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  describe('POST /customers', () => {
    it('should create a customer', async () => {
      const response = await request(app)
        .post('/customers')
        .send({
          name: 'any_name',
          address: {
            street: 'any_street',
            number: 1,
            city: 'any_city',
            zip: 'any_zip',
          },
        })

      expect(response.status).toBe(201)
      expect(response.body).toEqual({
        id: expect.any(String),
        name: 'any_name',
        address: {
          street: 'any_street',
          number: 1,
          city: 'any_city',
          zip: 'any_zip',
        },
      })
    })

    it('should not create a customer with invalid data', async () => {
      const response = await request(app).post('/customers').send({})

      expect(response.status).toBe(500)
    })
  })

  describe('GET /customers', () => {
    it('should list all customers', async () => {
      const createResponse1 = await request(app)
        .post('/customers')
        .send({
          name: 'any_name1',
          address: {
            street: 'any_street',
            number: 1,
            city: 'any_city',
            zip: 'any_zip',
          },
        })

      expect(createResponse1.status).toBe(201)

      const createResponse2 = await request(app)
        .post('/customers')
        .send({
          name: 'any_name2',
          address: {
            street: 'any_street',
            number: 1,
            city: 'any_city',
            zip: 'any_zip',
          },
        })

      expect(createResponse2.status).toBe(201)

      const response = await request(app).get('/customers')

      expect(response.status).toBe(200)
      expect(response.body.customers.length).toBe(2)
      const [customer1, customer2] = response.body.customers
      expect(customer1.name).toBe('any_name1')
      expect(customer1.address.street).toBe('any_street')
      expect(customer2.name).toBe('any_name2')
      expect(customer2.address.street).toBe('any_street')
    })
  })
})
