/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe'

import RestaurantRepository from '@repositories/RestaurantRepository'

import { RestaurantDTO } from '@interfaces/RestaurantDTO'
import WorkingHourRepository from '@repositories/WorkingHourRepository'
import { WorkingHourToPromotionDTO } from '@interfaces/WorkingHourDTO'
import { weekdays } from '@utils/constants'
import HttpException from '@exceptions/HttpException'
import ProductRepository from '@repositories/ProductRepository'
import { ProductDTO } from '@interfaces/ProductDTO'
import { PromotionDTO } from '@interfaces/PromotionDTO'
import PromotionRepository from '@repositories/PromotionRepository'

type ResponseDTO = ProductDTO & {
  promotion?: null | PromotionDTO & {
    workingHours: WorkingHourToPromotionDTO[]
  }
}

type RequestDTO = Omit<ResponseDTO, 'id'>

@injectable()
class UpdateProductService {
  constructor (
    @inject('RestaurantRepository')
    private restaurantRepository: RestaurantRepository,

    @inject('ProductRepository')
    private productRepository: ProductRepository,

    @inject('WorkingHourRepository')
    private workingHourRepository: WorkingHourRepository,

    @inject('PromotionRepository')
    private promotionRepository: PromotionRepository
  ) { }

  public async execute (
    data: RequestDTO,
    restaurantId: string,
    productId: string
  ): Promise<ResponseDTO> {
    const {
      promotion: receivedPromotion,
      ...receivedProduct
    } = data

    if (receivedPromotion?.workingHours) {
      this.validateWeekdays(receivedPromotion?.workingHours)
    }

    const restaurant: RestaurantDTO =
      await this.restaurantRepository.findOne({
        where: {
          id: restaurantId
        }
      })

    if (!restaurant) {
      throw new HttpException(404, 'Restaurant not found')
    }

    const oldProduct: ProductDTO =
      await this.productRepository.findOne({
        where: {
          id: productId
        }
      })

    if (!oldProduct) {
      throw new HttpException(404, 'Product not found')
    }

    let updatedProduct = oldProduct

    if (receivedProduct) {
      const {
        name,
        photoUrl: photo_url,
        price,
        categoryId: category_id
      } = receivedProduct

      const updatedProductResults = await this.productRepository.update({
        where: { restaurant_id: restaurantId },
        data: {
          name,
          photo_url,
          price,
          category_id
        }
      })

      updatedProduct = updatedProductResults[0]
    }

    const oldPromotion = await this.promotionRepository.findOne({
      where: {
        product_id: productId
      }
    })

    let updatedPromotion = oldPromotion || null
    let updatedPromotionWorkingHours

    if (receivedPromotion) {
      const { workingHours, ...justPromotion } = receivedPromotion

      const updatedPromotionResults = await this.promotionRepository.update({
        where: { product_id: productId },
        data: justPromotion
      })

      updatedPromotion = updatedPromotionResults[0]

      const oldWorkingHours = await this.workingHourRepository.findMany({
        where: {
          promotion_id: updatedPromotion.id
        }
      })

      updatedPromotionWorkingHours = oldWorkingHours
    }

    if (receivedPromotion?.workingHours?.length) {
      const promises = receivedPromotion.workingHours.map(
        async (day:any) => {
          const {
            weekday,
            startAt: start_at,
            finishAt: finish_at
          } = day

          const weekdayUpdated = await this.workingHourRepository.update({
            where: {
              promotion_id: updatedPromotion.id,
              weekday
            },
            data: {
              weekday,
              start_at,
              finish_at
            }
          })

          return weekdayUpdated[0] || null
        })

      if (promises) {
        updatedPromotionWorkingHours = await Promise.all(promises)
      }
    }

    return {
      ...updatedProduct,
      promotion: {
        ...updatedPromotion,
        workingHours: updatedPromotionWorkingHours
      }
    }
  }

  private validateWeekdays (workingHours: WorkingHourToPromotionDTO[]) {
    const alreadyChecked: WorkingHourToPromotionDTO[] = []

    workingHours.forEach((day) => {
      if (alreadyChecked.find(
        alreadyCheckedDay => alreadyCheckedDay.weekday === day.weekday)
      ) {
        throw new HttpException(400, `weekday ${day.weekday} is duplicated in request body`)
      }

      if (!weekdays.includes(String(day.weekday))) {
        throw new HttpException(400, `weekday ${day.weekday} does not exists`)
      }

      alreadyChecked.push(day)
    })
  }
}

export default UpdateProductService
