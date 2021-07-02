import { container } from 'tsyringe'

import ProductRepository from '@repositories/ProductRepository'
import AddressRepository from '@repositories/AddressRepository'
import PromotionRepository from '@repositories/PromotionRepository'
import RestaurantRepository from '@repositories/RestaurantRepository'
import WorkingHourRepository from '@repositories/WorkingHourRepository'

container.registerSingleton<AddressRepository>(
  'AddressRepository',
  AddressRepository
)

container.registerSingleton<RestaurantRepository>(
  'RestaurantRepository',
  RestaurantRepository
)

container.registerSingleton<WorkingHourRepository>(
  'WorkingHourRepository',
  WorkingHourRepository
)

container.registerSingleton<ProductRepository>(
  'ProductRepository',
  ProductRepository
)

container.registerSingleton<PromotionRepository>(
  'PromotionRepository',
  PromotionRepository
)
