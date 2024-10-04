import express from 'express'

import { ProductRepository } from '@infra/product/repository/sequelize/product.repository'
import { InputCreateProductDto } from '@usecase/product/create/create.product.dto'
import { CreateProductUseCase } from '@usecase/product/create/create.product.usecase'

export const productRouter = express.Router()

productRouter.post('/', async (req, res) => {
  try {
    const useCase = new CreateProductUseCase(new ProductRepository())

    const productDto: InputCreateProductDto = {
      name: req.body.name,
      price: req.body.price,
      type: 'a',
    }

    const output = await useCase.execute(productDto)

    res.status(201).json(output)
  } catch (err) {
    res.status(500).send('Internal server error')
  }
})
