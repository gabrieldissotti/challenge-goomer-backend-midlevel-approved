import { inject, injectable } from 'tsyringe'

import RestaurantRepository from '@repositories/RestaurantRepository'
import AddressRepository from '@repositories/AddressRepository'

import { RestaurantDTO } from '@interfaces/RestaurantDTO'
import { AddressDTO } from '@interfaces/AddressDTO'
import HttpException from '@libraries/HttpException'
import WorkingHourRepository from '@repositories/WorkingHourRepository'
import { WorkingHourToRestaurantDTO } from '@interfaces/WorkingHourDTO'

type Restaurant = RestaurantDTO & {
  address: AddressDTO;
  workingHours: WorkingHourToRestaurantDTO[]
}

@injectable()
class ShowRestaurantService {
  constructor (
    @inject('RestaurantRepository')
    private restaurantRepository: RestaurantRepository,

    @inject('AddressRepository')
    private addressRepository: AddressRepository,

    @inject('WorkingHourRepository')
    private workingHourRepository: WorkingHourRepository
  ) { }

  public async execute (restaurantId: string): Promise<Restaurant> {
    const restaurant: Restaurant =
      await this.restaurantRepository.findOne({
        where: {
          id: restaurantId
        }
      })

    if (!restaurant) {
      throw new HttpException(404, 'Restaurant not found')
    }

    restaurant.address =
      await this.addressRepository.findOne({
        where: {
          restaurant_id: restaurantId
        }
      })

    restaurant.workingHours = await this.workingHourRepository.findMany({
      where: {
        restaurant_id: restaurantId
      }
    })

    return restaurant
  }
}

export default ShowRestaurantService
