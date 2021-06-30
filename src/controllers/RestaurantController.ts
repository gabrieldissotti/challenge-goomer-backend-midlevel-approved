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
import ShowRestaurantService from '@services/ShowRestaurantService'
import UpdateRestaurantValidator from '@validators/UpdateRestaurantValidator'
import UpdateRestaurantService from '@services/UpdateRestaurantService'

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

  public async show (request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params

      const restaurantsRepository = container.resolve(RestaurantRepository)
      const addressRepository = container.resolve(AddressRepository)

      const showRestaurantService = new ShowRestaurantService(
        restaurantsRepository,
        addressRepository
      )

      const restaurant = await showRestaurantService.execute(
        id
      )

      return response.json(restaurant)
    } catch (error) {
      next(error)
    }
  }

  public async update (request: Request, response: Response, next: NextFunction) {
    try {
      const bodyParams = new UpdateRestaurantValidator(request.body)
      await bodyParams.validate()
      const expectedParams = bodyParams.getExpectedParams()

      const restaurantsRepository = container.resolve(RestaurantRepository)
      const addressRepository = container.resolve(AddressRepository)

      const updateRestaurantService = new UpdateRestaurantService(
        restaurantsRepository,
        addressRepository
      )

      const restaurantWithAddress = await updateRestaurantService.execute(
        expectedParams,
        request.params.id
      )

      return response.json(restaurantWithAddress)
    } catch (error) {
      next(error)
    }
  }
}

export default new RestaurantController()
