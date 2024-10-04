import express from 'express'

import { ProductRepository } from '@infra/product/repository/sequelize/product.repository'
import { InputCreateProductDto } from '@usecase/product/create/create.product.dto'
import { CreateProductUseCase } from '@usecase/product/create/create.product.usecase'
import { ListProductUseCase } from '@usecase/product/list/list.product.usecase'

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

productRouter.get('/', async (req, res) => {
  try {
    const useCase = new ListProductUseCase(new ProductRepository())

    const products = await useCase.execute({})

    res.status(200).json(products)
  } catch (err) {
    res.status(500).send('Internal server error')
  }
})
