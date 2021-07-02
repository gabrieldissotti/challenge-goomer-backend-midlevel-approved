import { inject, injectable } from 'tsyringe'

import AddressRepository from '@repositories/AddressRepository'
import RestaurantRepository from '@repositories/RestaurantRepository'

import HttpException from '@exceptions/HttpException'

type ResponseDTO = {
  success: boolean;
}

@injectable()
class Destroy {
  constructor (
    @inject('RestaurantRepository')
    private restaurantRepository: RestaurantRepository,

    @inject('AddressRepository')
    private addressRepository: AddressRepository
  ) { }

  public async execute (restaurantId: string): Promise<ResponseDTO> {
    const restaurant = await this.restaurantRepository.findOne({
      where: {
        id: restaurantId
      }
    })

    if (!restaurant) {
      throw new HttpException(404, 'Restaurant not found')
    }

    await this.restaurantRepository.delete({
      id: restaurantId
    })

    return { success: true }
  }
}

export default Destroy
