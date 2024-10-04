import express from 'express'
import { Sequelize } from 'sequelize-typescript'

import { customerRouter } from '@infra/api/routes/customer.route'
import { CustomerModel } from '@infra/customer/repository/sequelize/customer.model'

export const app = express()

app.use(express.json())
app.use('/customers', customerRouter)

export let sequelize: Sequelize

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  })
  sequelize.addModels([CustomerModel])
  await sequelize.sync()
}
setupDb()
