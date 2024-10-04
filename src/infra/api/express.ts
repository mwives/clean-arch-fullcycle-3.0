import express from 'express'
import { Sequelize } from 'sequelize-typescript'

import { customerRouter } from '@infra/api/routes/customer.route'
import { productRouter } from '@infra/api/routes/product.route'
import { CustomerModel } from '@infra/customer/repository/sequelize/customer.model'
import { ProductModel } from '@infra/product/repository/sequelize/product.model'

export const app = express()

app.use(express.json())
app.use('/customers', customerRouter)
app.use('/products', productRouter)

export let sequelize: Sequelize

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  })
  sequelize.addModels([CustomerModel, ProductModel])
  await sequelize.sync()
}
setupDb()
