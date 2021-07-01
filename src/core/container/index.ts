import { container } from 'tsyringe'

import AddressRepository from '@repositories/AddressRepository'
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
