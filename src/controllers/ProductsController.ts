import { Request, Response, NextFunction } from 'express'
import { container } from 'tsyringe'

import RestaurantRepository from '@repositories/RestaurantRepository'
import CreateProductService from '@services/CreateProductService'
import WorkingHourRepository from '@repositories/WorkingHourRepository'

import CreateProductValidator from '@validators/CreateProductValidator'
import ProductRepository from '@repositories/ProductRepository'
import PromotionRepository from '@repositories/PromotionRepository'

class ProductsController {
  public async store (request: Request, response: Response, next: NextFunction) {
    try {
      const bodyParams = new CreateProductValidator(request.body)
      await bodyParams.validate()
      const expectedParams = bodyParams.getExpectedParams()

      const restaurantRepository = container.resolve(RestaurantRepository)
      const productRepository = container.resolve(ProductRepository)
      const workingHourRepository = container.resolve(WorkingHourRepository)
      const promotionRepository = container.resolve(PromotionRepository)

      const createProductService = new CreateProductService(
        restaurantRepository,
        productRepository,
        workingHourRepository,
        promotionRepository
      )

      const restaurantWithAddress = await createProductService.execute(
        expectedParams,
        request.params.id
      )

      return response.json(restaurantWithAddress)
    } catch (error) {
      next(error)
    }
  }
}

export default new ProductsController()
