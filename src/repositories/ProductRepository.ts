/* eslint-disable camelcase */
import { ProductDTO } from '@interfaces/ProductDTO'
import ProductEntity from '@entities/ProductEntity'
import AppRepository from './AppRepository'

export default class ProductRepository extends AppRepository {
  constructor () {
    const { table, schema } = ProductEntity

    super({ table, schema })
  }

  public async create (
    data: Omit<ProductDTO, 'id'>
  ): Promise<ProductDTO> {
    const {
      name,
      photoUrl: photo_url,
      restaurantId: restaurant_id,
      categoryId: category_id,
      price
    } = data

    const result = await this.save({
      name,
      photo_url,
      restaurant_id,
      category_id,
      price
    })

    const product = new ProductEntity(result[0])

    return product
  }
}
