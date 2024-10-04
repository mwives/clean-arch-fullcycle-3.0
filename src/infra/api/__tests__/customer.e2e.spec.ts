import { app, sequelize } from '@infra/api/express'
import request from 'supertest'

describe('Customer E2E', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

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
