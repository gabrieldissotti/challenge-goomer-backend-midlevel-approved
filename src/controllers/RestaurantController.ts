import { Request, Response, NextFunction } from 'express'
import { container } from 'tsyringe'

import Redis from '@libraries/Redis'

import AddressRepository from '@repositories/AddressRepository'
import RestaurantRepository from '@repositories/RestaurantRepository'
import WorkingHourRepository from '@repositories/WorkingHourRepository'

import ShowRestaurantService from '@services/ShowRestaurantService'
import ListRestaurantsService from '@services/ListRestaurantsService'
import UpdateRestaurantService from '@services/UpdateRestaurantService'
import CreateRestaurantService from '@services/CreateRestaurantService'
import DestroyRestaurantService from '@services/DestroyRestaurantService'

import CreateRestaurantValidator from '@validators/CreateRestaurantValidator'
import UpdateRestaurantValidator from '@validators/UpdateRestaurantValidator'
import DefaultPaginatedListValidator from '@validators/DefaultPaginatedListValidator'

import { getRedisKey } from '@utils/functions'

class RestaurantController {
  public async store (request: Request, response: Response, next: NextFunction) {
    try {
      const bodyParams = new CreateRestaurantValidator(request.body)
      await bodyParams.validate()
      const expectedParams = bodyParams.getExpectedParams()

      const restaurantsRepository = container.resolve(RestaurantRepository)
      const addressRepository = container.resolve(AddressRepository)
      const workingHourRepository = container.resolve(WorkingHourRepository)

      const createRestaurantService = new CreateRestaurantService(
        restaurantsRepository,
        addressRepository,
        workingHourRepository
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

      const listRestaurantsService = new ListRestaurantsService(
        restaurantsRepository
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
      const workingHourRepository = container.resolve(WorkingHourRepository)

      const showRestaurantService = new ShowRestaurantService(
        restaurantsRepository,
        addressRepository,
        workingHourRepository
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
      const workingHourRepository = container.resolve(WorkingHourRepository)

      const updateRestaurantService = new UpdateRestaurantService(
        restaurantsRepository,
        addressRepository,
        workingHourRepository
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

  public async destroy (request: Request, response: Response, next: NextFunction) {
    try {
      const restaurantsRepository = container.resolve(RestaurantRepository)
      const addressRepository = container.resolve(AddressRepository)

      const destroyRestaurantService = new DestroyRestaurantService(
        restaurantsRepository,
        addressRepository
      )

      const responseData = await destroyRestaurantService.execute(
        request.params.id
      )

      return response.json(responseData)
    } catch (error) {
      next(error)
    }
  }
}

export default new RestaurantController()
