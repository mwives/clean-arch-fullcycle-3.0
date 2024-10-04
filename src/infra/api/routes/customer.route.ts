import express from 'express'

import { CustomerRepository } from '@infra/customer/repository/sequelize/customer.repository'
import { CreateCustomerUseCase } from '@usecase/customer/create/create.customer.usecase'
import { InputCreateCustomerDto } from '@usecase/customer/create/create.customer.dto'

export const customerRouter = express.Router()

customerRouter.post('/', async (req, res) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository())

  try {
    const customerDto: InputCreateCustomerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        zip: req.body.address.zip,
      },
    }

    const output = await usecase.execute(customerDto)

    res.status(201).json(output)
  } catch (err) {
    res.status(500).send('Internal server error')
  }
})
