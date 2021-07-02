/* eslint-disable camelcase */
import {
  FindAllProductsParamsDTO,
  FindAllProductsResponseDTO,
  ProductDTO
} from '@interfaces/ProductDTO'

import ProductEntity from '@entities/ProductEntity'

import AppRepository from './AppRepository'
export default class ProductRepository extends AppRepository {
  constructor () {
    super(ProductEntity)
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

    return result
  }

  public async findAllProducts ({
    page,
    pagesize,
    restaurantId
  }: FindAllProductsParamsDTO):
    Promise<FindAllProductsResponseDTO> {
    const connection = await this.connect()

    const totalResults = await connection(this.table)
      .withSchema(this.schema)
      .where({
        restaurant_id: restaurantId
      })
      .select(connection.raw('count(id) OVER() as total'))

    const totalItems = Number(totalResults[0]?.total || 0)

    if (!totalItems) {
      return {
        pagination: {
          page,
          totalPages: Math.ceil(totalItems / pagesize),
          pagesize,
          totalItems
        },
        items: []
      }
    }

    const results = await connection(this.table)
      .withSchema(this.schema)
      .limit(pagesize)
      .where({
        'products.restaurant_id': restaurantId
      })
      .offset((page - 1) * pagesize)
      .join(
        'categories',
        'categories.id',
        'products.category_id'
      )
      .leftJoin(
        'promotions',
        'promotions.product_id',
        'products.id'
      )
      .leftJoin(
        'working_hours',
        'working_hours.promotion_id',
        'promotions.id'
      )
      .select([
        'products.*',
        'categories.name as category_name',
        'promotions.description as promotion_description',
        'promotions.price as promotion_price',
        'working_hours.start_at as promotion_start_at',
        'working_hours.finish_at as promotion_finish_at'
      ])

    return {
      pagination: {
        page,
        totalPages: Math.ceil(totalItems / pagesize),
        pagesize,
        totalItems
      },
      items: results
    }
  }
}
