import { inject, injectable } from 'tsyringe'

import ProductRepository from '@repositories/ProductRepository'
import PromotionRepository from '@repositories/PromotionRepository'
import RestaurantRepository from '@repositories/RestaurantRepository'
import WorkingHourRepository from '@repositories/WorkingHourRepository'

import HttpException from '@exceptions/HttpException'

import { weekdays } from '@utils/constants'

import { ProductDTO } from '@interfaces/ProductDTO'
import { PromotionDTO } from '@interfaces/PromotionDTO'
import { RestaurantDTO } from '@interfaces/RestaurantDTO'
import {
  WorkingHourToPromotionDTO,
  WorkingHourToRestaurantDTO
} from '@interfaces/WorkingHourDTO'

type ResponseDTO = ProductDTO & {
  promotion?: null | PromotionDTO & {
    workingHours: WorkingHourToRestaurantDTO[]
  }
}

type RequestDTO = Omit<ResponseDTO, 'id'>

@injectable()
class CreateProductService {
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

  public async execute (data: RequestDTO, restaurantId: string): Promise<ResponseDTO> {
    const { promotion, ...productData } = data

    if (promotion?.workingHours) {
      this.validateWeekdays(promotion?.workingHours)
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

    const product: ProductDTO =
      await this.productRepository.create({
        ...productData,
        restaurantId
      })

    if (!promotion) {
      return {
        ...product,
        promotion: null
      }
    }

    if (!promotion?.workingHours?.length) {
      throw new HttpException(400, 'Promotion cant be created without working hours/weekdays')
    }

    const { workingHours, ...promotionData } = promotion

    const savedPromotion: PromotionDTO =
      await this.promotionRepository.create({
        ...promotionData,
        productId: product.id
      })

    const workingHoursToSave = promotion?.workingHours.map(
      (day: WorkingHourToPromotionDTO) => ({
        ...day,
        promotionId: savedPromotion.id
      }))

    const savedWorkingHours: WorkingHourToPromotionDTO[] =
      await this.workingHourRepository.createManyToPromotion(
        workingHoursToSave
      )

    return {
      ...product,
      promotion: {
        ...savedPromotion,
        workingHours: savedWorkingHours
      }
    }
  }

  private validateWeekdays (workingHours: WorkingHourToRestaurantDTO[]) {
    const alreadyChecked: WorkingHourToRestaurantDTO[] = []

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

export default CreateProductService
