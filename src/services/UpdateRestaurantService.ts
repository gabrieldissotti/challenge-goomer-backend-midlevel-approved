import { inject, injectable } from 'tsyringe'

import RestaurantRepository from '@repositories/RestaurantRepository'
import AddressRepository from '@repositories/AddressRepository'

import { RestaurantDTO } from '@interfaces/RestaurantDTO'
import { AddressDTO } from '@interfaces/AddressDTO'
import HttpException from '@libraries/HttpException'

type ResponseDTO = RestaurantDTO & {
  address: AddressDTO
}

type RequestDTO = {
  name?: string;
  photoUrl?: string;
  address?: {
    id?: string;
    street?: string;
    number?: string;
    postalCode?: string;
    neighborhood?: string;
    restaurantId?: string;
  }
}

@injectable()
class UpdateRestaurantService {
  constructor (
    @inject('RestaurantRepository')
    private restaurantRepository: RestaurantRepository,

    @inject('AddressRepository')
    private addressRepository: AddressRepository
  ) { }

  public async execute (data: RequestDTO, restaurantId: string): Promise<ResponseDTO> {
    if (!data?.address && !data?.name && !data?.photoUrl) {
      throw new HttpException(400, 'You can\'t update a restaurant without least give a field in request body')
    }
    let restaurant = []

    restaurant[0] = await this.restaurantRepository.findOne({
      where: {
        id: restaurantId
      }
    })

    if (!restaurant[0]) {
      throw new HttpException(404, 'Restaurant not found')
    }

    const updatedRestaurant =
        await this.restaurantRepository.update({
          where: {
            id: restaurantId
          },
          data: {
            name: data?.name,
            photo_url: data?.photoUrl
          }
        })

    if (updatedRestaurant.length) {
      restaurant = updatedRestaurant
    }

    const address =
        await this.addressRepository.update({
          where: {
            restaurant_id: restaurantId
          },
          data: data?.address
        })

    if (!address.length) {
      address[0] = await this.addressRepository.findOne({
        where: {
          restaurant_id: restaurantId
        }
      })
    }

    return {
      ...restaurant[0],
      address: address[0]
    }
  }
}

export default UpdateRestaurantService
