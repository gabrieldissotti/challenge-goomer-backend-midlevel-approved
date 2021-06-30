import { inject, injectable } from 'tsyringe'

import RestaurantRepository from '@repositories/RestaurantRepository'
import AddressRepository from '@repositories/AddressRepository'

import { RestaurantDTO } from '@interfaces/RestaurantDTO'
import { AddressDTO } from '@interfaces/AddressDTO'
import HttpException from '@libraries/HttpException'

type Restaurant = RestaurantDTO & {
  address: AddressDTO
}

@injectable()
class ShowRestaurantService {
  constructor (
    @inject('RestaurantRepository')
    private restaurantRepository: RestaurantRepository,

    @inject('AddressRepository')
    private addressRepository: AddressRepository
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

    return restaurant
  }
}

export default ShowRestaurantService
