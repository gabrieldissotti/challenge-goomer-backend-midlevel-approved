import { inject, injectable } from 'tsyringe'

import RestaurantRepository from '@repositories/RestaurantRepository'

import { ProductDTO } from '@interfaces/ProductDTO'
import ProductRepository from '@repositories/ProductRepository'
import { RestaurantDTO } from '@interfaces/RestaurantDTO'
import HttpException from '@exceptions/HttpException'

type ResponseDTO = {
  success: boolean
}

@injectable()
class DestroyProductService {
  constructor (
    @inject('RestaurantRepository')
    private restaurantRepository: RestaurantRepository,

    @inject('ProductRepository')
    private productRepository: ProductRepository
  ) { }

  public async execute (
    restaurantId: string,
    productId: string
  ): Promise<ResponseDTO> {
    const restaurant: RestaurantDTO =
      await this.restaurantRepository.findOne({
        where: {
          id: restaurantId
        }
      })

    if (!restaurant) {
      throw new HttpException(404, 'Restaurant not found')
    }

    const product: ProductDTO =
      await this.productRepository.findOne({
        where: {
          id: productId
        }
      })

    if (!product) {
      throw new HttpException(404, 'Product not found')
    }

    await this.productRepository.delete({
      id: productId
    })

    return { success: true }
  }
}

export default DestroyProductService
