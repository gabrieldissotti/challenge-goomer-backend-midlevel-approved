import { inject, injectable } from 'tsyringe'

import RestaurantRepository from '@repositories/RestaurantRepository'
import AddressRepository from '@repositories/AddressRepository'

import { RestaurantDTO } from '@interfaces/RestaurantDTO'
import { AddressDTO } from '@interfaces/AddressDTO'

type ResponseDTO = RestaurantDTO & {
  address: AddressDTO
}

type RequestDTO = Omit<ResponseDTO, 'id'>

@injectable()
class CreateRestaurantService {
  constructor (
    @inject('RestaurantRepository')
    private restaurantRepository: RestaurantRepository,

    @inject('AddressRepository')
    private addressRepository: AddressRepository
  ) { }

  public async execute (data: RequestDTO): Promise<ResponseDTO> {
    const {
      address: addressData,
      ...restaurantData
    } = data

    const restaurant: RestaurantDTO =
      await this.restaurantRepository.create(
        restaurantData
      )

    const address: AddressDTO =
      await this.addressRepository.create({
        ...addressData,
        restaurantId: restaurant.id
      })

    return {
      ...restaurant,
      address
    }
  }
}

export default CreateRestaurantService
