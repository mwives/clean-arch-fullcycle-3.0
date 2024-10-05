import express from 'express'

import { CustomerRepository } from '@infra/customer/repository/sequelize/customer.repository'
import { InputCreateCustomerDto } from '@usecase/customer/create/create.customer.dto'
import { CreateCustomerUseCase } from '@usecase/customer/create/create.customer.usecase'
import { ListCustomerUseCase } from '@usecase/customer/list/list.customer.usecase'
import { CustomerPresenter } from '../presenter/customer.presenter'

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

customerRouter.get('/', async (req, res) => {
  try {
    const useCase = new ListCustomerUseCase(new CustomerRepository())

    const customers = await useCase.execute({})

    res.format({
      json: () => res.status(200).json(customers),
      xml: () => res.send(CustomerPresenter.listXml(customers)),
    })
  } catch (err) {
    res.status(500).send('Internal server error')
  }
})
