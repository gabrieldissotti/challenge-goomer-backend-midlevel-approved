/* eslint-disable camelcase */
import {
  WorkingHourToRestaurantDTO,
  WorkingHourToPromotionDTO
} from '@interfaces/WorkingHourDTO'

import WorkingHourEntity from '@entities/WorkingHourEntity'

import AppRepository from './AppRepository'

export default class WorkingHourRepository extends AppRepository {
  constructor () {
    super(WorkingHourEntity)
  }

  public async createManyToRestaurant (
    data: WorkingHourToRestaurantDTO[]
  ): Promise<WorkingHourToRestaurantDTO[]> {
    const parsedData = data.map(day => ({
      weekday: day.weekday,
      start_at: day.startAt.toString(),
      finish_at: day.finishAt.toString(),
      restaurant_id: day.restaurantId
    }))

    const results = await this.save(parsedData)

    return results
  }

  public async createManyToPromotion (
    data: WorkingHourToPromotionDTO[]
  ): Promise<WorkingHourToPromotionDTO[]> {
    const parsedData = data.map(day => ({
      weekday: day.weekday,
      start_at: day.startAt.toString(),
      finish_at: day.finishAt.toString(),
      promotion_id: day.promotionId
    }))

    const results = await this.save(parsedData)

    return results
  }
}
