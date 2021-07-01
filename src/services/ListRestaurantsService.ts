import { inject, injectable } from 'tsyringe'

import RestaurantRepository from '@repositories/RestaurantRepository'

import { RestaurantDTO } from '@interfaces/RestaurantDTO'

type ResponseDTO = RestaurantDTO[]

type RequestDTO = {
  page: number;
  pagesize: number;
}

@injectable()
class ListRestaurantsService {
  constructor (
    @inject('RestaurantRepository')
    private restaurantRepository: RestaurantRepository
  ) { }

  public async execute (paginationFilters: RequestDTO): Promise<ResponseDTO> {
    const restaurants: RestaurantDTO[] =
      await this.restaurantRepository.findAll({
        ...paginationFilters
      })

    return restaurants
  }
}

export default ListRestaurantsService
