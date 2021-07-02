/* eslint-disable camelcase */
import { RestaurantDTO } from '@interfaces/RestaurantDTO'

import RestaurantEntity from '@entities/RestaurantEntity'

import AppRepository from './AppRepository'

export default class RestaurantRepository extends AppRepository {
  constructor () {
    super(RestaurantEntity)
  }

  public async create (
    data: Omit<RestaurantDTO, 'id'>
  ): Promise<RestaurantDTO> {
    const {
      name,
      photoUrl: photo_url
    } = data

    const result = await this.save({
      name,
      photo_url
    })

    return result
  }
}
