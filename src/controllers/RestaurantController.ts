import { Request, Response, NextFunction } from 'express'
import { container } from 'tsyringe'

import RestaurantRepository from '@repositories/RestaurantRepository'
import CreateRestaurantService from '@services/CreateRestaurantService'
import CreateRestaurantValidator from '@validators/CreateRestaurantValidator'
import AddressRepository from '@repositories/AddressRepository'
import DefaultPaginatedListValidator from '@validators/DefaultPaginatedListValidator'
import ListRestaurantsService from '@services/ListRestaurantsService'
import { getRedisKey } from '@utils/functions'
import Redis from '@libraries/Redis'

class RestaurantController {
  public async store (request: Request, response: Response, next: NextFunction) {
    try {
      const bodyParams = new CreateRestaurantValidator(request.body)
      await bodyParams.validate()
      const expectedParams = bodyParams.getExpectedParams()

      const restaurantsRepository = container.resolve(RestaurantRepository)
      const addressRepository = container.resolve(AddressRepository)

      const createRestaurantService = new CreateRestaurantService(
        restaurantsRepository,
        addressRepository
      )

      const restaurantWithAddress = await createRestaurantService.execute(
        expectedParams
      )

      return response.json(restaurantWithAddress)
    } catch (error) {
      next(error)
    }
  }

  public async index (request: Request, response: Response, next: NextFunction) {
    try {
      const queryParams = new DefaultPaginatedListValidator(request.query)
      await queryParams.validate()
      const expectedParams = queryParams.getExpectedParams()

      const restaurantsRepository = container.resolve(RestaurantRepository)
      const addressRepository = container.resolve(AddressRepository)

      const listRestaurantsService = new ListRestaurantsService(
        restaurantsRepository,
        addressRepository
      )

      const restaurantsWithAddress = await listRestaurantsService.execute(
        expectedParams
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
}

export default new RestaurantController()
