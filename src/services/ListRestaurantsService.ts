import { inject, injectable } from 'tsyringe'

import RestaurantRepository from '@repositories/RestaurantRepository'
import AddressRepository from '@repositories/AddressRepository'

import { RestaurantDTO } from '@interfaces/RestaurantDTO'
import { AddressDTO } from '@interfaces/AddressDTO'

type Restaurant = RestaurantDTO & {
  address: AddressDTO
}

type ResponseDTO = Restaurant[]

type RequestDTO = {
  page: number;
  pagesize: number;
}

@injectable()
class ListRestaurantsService {
  constructor (
    @inject('RestaurantRepository')
    private restaurantRepository: RestaurantRepository,

    @inject('AddressRepository')
    private addressRepository: AddressRepository
  ) { }

  public async execute (paginationFilters: RequestDTO): Promise<ResponseDTO> {
    const restaurantWithAddress: Restaurant[] =
      await this.restaurantRepository.findAll({
        ...paginationFilters
      })

    return restaurantWithAddress
  }
}

export default ListRestaurantsService
