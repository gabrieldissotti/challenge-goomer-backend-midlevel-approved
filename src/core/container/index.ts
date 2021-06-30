import { container } from 'tsyringe'

import AddressRepository from '@repositories/AddressRepository'
import RestaurantRepository from '@repositories/RestaurantRepository'

container.registerSingleton<AddressRepository>(
  'AddressRepository',
  AddressRepository
)

container.registerSingleton<RestaurantRepository>(
  'RestaurantRepository',
  RestaurantRepository
)
