import { container } from 'tsyringe'
import { Request, Response, NextFunction } from 'express'

import Redis from '@libraries/Redis'

import ProductRepository from '@repositories/ProductRepository'
import PromotionRepository from '@repositories/PromotionRepository'
import RestaurantRepository from '@repositories/RestaurantRepository'
import WorkingHourRepository from '@repositories/WorkingHourRepository'

import ListProductsService from '@services/ListProductsService'
import UpdateProductService from '@services/UpdateProductService'
import CreateProductService from '@services/CreateProductService'
import DestroyProductService from '@services/DestroyProductService'

import CreateProductValidator from '@validators/CreateProductValidator'
import DefaultPaginatedListValidator from '@validators/DefaultPaginatedListValidator'

import { getRedisKey } from '@utils/functions'
class ProductsController {
  public async index (request: Request, response: Response, next: NextFunction) {
    try {
      const queryParams = new DefaultPaginatedListValidator(request.query)
      await queryParams.validate()
      const expectedParams = queryParams.getExpectedParams()

      const restaurantRepository = container.resolve(RestaurantRepository)
      const productRepository = container.resolve(ProductRepository)

      const listProductsService = new ListProductsService(
        restaurantRepository,
        productRepository
      )

      const restaurantsWithAddress = await listProductsService.execute(
        expectedParams,
        request.params.id
      )

      if (Redis.isReadyToUse) {
        Redis.saveInRedis(
          getRedisKey(request),
          restaurantsWithAddress
        )
      }

      return response.json(restaurantsWithAddress)
    } catch (error) {
      next(error)
    }
  }

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

      const productWithPromotionAndWorkingHours = await createProductService.execute(
        expectedParams,
        request.params.id
      )

      return response.json(productWithPromotionAndWorkingHours)
    } catch (error) {
      next(error)
    }
  }

  public async update (request: Request, response: Response, next: NextFunction) {
    try {
      const bodyParams = new CreateProductValidator(request.body)
      await bodyParams.validate()
      const expectedParams = bodyParams.getExpectedParams()

      const restaurantRepository = container.resolve(RestaurantRepository)
      const productRepository = container.resolve(ProductRepository)
      const workingHourRepository = container.resolve(WorkingHourRepository)
      const promotionRepository = container.resolve(PromotionRepository)

      const updateProductService = new UpdateProductService(
        restaurantRepository,
        productRepository,
        workingHourRepository,
        promotionRepository
      )

      const productWithPromotionAndWorkingHours =
        await updateProductService.execute(
          expectedParams,
          request.params.restaurantId,
          request.params.productId
        )

      return response.json(productWithPromotionAndWorkingHours)
    } catch (error) {
      next(error)
    }
  }

  public async destroy (request: Request, response: Response, next: NextFunction) {
    try {
      const restaurantRepository = container.resolve(RestaurantRepository)
      const productRepository = container.resolve(ProductRepository)

      const destroyProductService = new DestroyProductService(
        restaurantRepository,
        productRepository
      )

      const restaurantsWithAddress = await destroyProductService.execute(
        request.params.restaurantId,
        request.params.productId
      )

      return response.json(restaurantsWithAddress)
    } catch (error) {
      next(error)
    }
  }
}

export default new ProductsController()
