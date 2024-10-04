import { CustomerModel } from '@infra/customer/repository/sequelize/customer.model'
import express from 'express'
import { Sequelize } from 'sequelize-typescript'

export const app = express()

app.use(express.json())

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
