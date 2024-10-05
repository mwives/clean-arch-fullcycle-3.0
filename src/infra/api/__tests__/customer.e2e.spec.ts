import { app, sequelize } from '@infra/api/express'
import request from 'supertest'

describe('Customer E2E', () => {
  const customerData = {
    name: 'any_name',
    address: {
      street: 'any_street',
      number: 1,
      city: 'any_city',
      zip: 'any_zip',
    },
  }

  const createCustomer = async (data = customerData) => {
    return request(app).post('/customers').send(data)
  }

  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  describe('POST /customers', () => {
    it('should create a customer', async () => {
      const response = await createCustomer()

      expect(response.status).toBe(201)
      expect(response.body).toEqual({
        id: expect.any(String),
        name: customerData.name,
        address: customerData.address,
      })
    })

    it('should not create a customer with invalid data', async () => {
      const response = await createCustomer({ name: 'any_name', address: null })

      expect(response.status).toBe(500)
    })
  })

  describe('GET /customers', () => {
    it('should list all customers', async () => {
      const customerData1 = { ...customerData, name: 'any_name1' }
      const customerData2 = { ...customerData, name: 'any_name2' }

      const createResponse1 = await createCustomer(customerData1)
      const createResponse2 = await createCustomer(customerData2)

      expect(createResponse1.status).toBe(201)
      expect(createResponse2.status).toBe(201)

      const response = await request(app).get('/customers')

      expect(response.status).toBe(200)
      expect(response.body.customers.length).toBe(2)

      const [customer1, customer2] = response.body.customers
      expect(customer1.name).toBe(customerData1.name)
      expect(customer1.address.street).toBe(customerData1.address.street)
      expect(customer2.name).toBe(customerData2.name)
      expect(customer2.address.street).toBe(customerData2.address.street)
    })

    it('should list all customers with xml format', async () => {
      const customerData1 = { ...customerData, name: 'any_name1' }
      const customerData2 = { ...customerData, name: 'any_name2' }

      const createResponse1 = await createCustomer(customerData1)
      const createResponse2 = await createCustomer(customerData2)

      expect(createResponse1.status).toBe(201)
      expect(createResponse2.status).toBe(201)

      const response = await request(app)
        .get('/customers')
        .set('Accept', 'application/xml')

      expect(response.status).toBe(200)
      expect(response.text).toContain('<?xml version="1.0" encoding="UTF-8"?>')
      expect(response.text).toContain('<customers>')
      expect(response.text).toContain('</customers>')
      expect(response.text).toContain('<name>any_name1</name>')
      expect(response.text).toContain('<name>any_name2</name>')
      expect(response.text).toContain('<street>any_street</street>')
    })
  })
})
