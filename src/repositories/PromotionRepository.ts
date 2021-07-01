/* eslint-disable camelcase */
import PromotionEntity from '@entities/PromotionEntity'
import AppRepository from './AppRepository'
import { PromotionDTO } from '@interfaces/PromotionDTO'

export default class PromotionRepository extends AppRepository {
  constructor () {
    const { table, schema } = PromotionEntity

    super({ table, schema })
  }

  public async create (
    data: Omit<PromotionDTO, 'id'>
  ): Promise<PromotionDTO> {
    const {
      description,
      price,
      productId
    } = data

    const result = await this.save({
      description,
      price,
      product_id: productId
    })

    const product = new PromotionEntity(result[0])

    return product
  }
}
