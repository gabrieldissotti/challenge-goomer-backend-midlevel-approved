import AddressRepository from '@repositories/AddressRepository'
import RestaurantRepository from '@repositories/RestaurantRepository'
import WorkingHourRepository from '@repositories/WorkingHourRepository'

import ShowRestaurantService from '@services/ShowRestaurantService'

import HttpException from '@exceptions/HttpException'

import AddressRepositoryMock from '@mocks/AddressRepositoryMock'
import RestaurantRepositoryMock from '@mocks/RestaurantRepositoryMock'
import WorkingHourRepositoryMock from '@mocks/WorkingHourRepositoryMock'

jest.mock('@repositories/RestaurantRepository', () =>
  jest.fn().mockImplementation(() => RestaurantRepositoryMock)
)

jest.mock('@repositories/AddressRepository', () =>
  jest.fn().mockImplementation(() => AddressRepositoryMock)
)

jest.mock('@repositories/WorkingHourRepository', () =>
  jest.fn().mockImplementation(() => WorkingHourRepositoryMock)
)

describe('Destroy Restaurant Service', () => {
  it('should be instantiated correctly', async () => {
    const restaurantRepository = new RestaurantRepository()
    const addressRepository = new AddressRepository()
    const workingHourRepository = new WorkingHourRepository()

    const createRestaurantService = new ShowRestaurantService(
      restaurantRepository,
      addressRepository,
      workingHourRepository
    )

    await expect(
      createRestaurantService.execute('a-uuid')
    ).resolves.not.toThrow(Error)
  })

  it('should throw an exception when restaurant is not found', async () => {
    const restaurantRepository = new RestaurantRepository()
    const addressRepository = new AddressRepository()
    const workingHourRepository = new WorkingHourRepository()

    const showRestaurantService = new ShowRestaurantService(
      restaurantRepository,
      addressRepository,
      workingHourRepository
    )

    restaurantRepository.findOne = async () => undefined

    await expect(
      showRestaurantService.execute('a-uuid')
    ).rejects.toThrow(HttpException)
  })
})
