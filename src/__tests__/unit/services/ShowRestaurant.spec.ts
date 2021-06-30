import RestaurantRepository from '@repositories/RestaurantRepository'
import AddressRepository from '@repositories/AddressRepository'
import RestaurantRepositoryMock from '@mocks/RestaurantRepositoryMock'
import AddressRepositoryMock from '@mocks/AddressRepositoryMock'
import ShowRestaurantService from '@services/ShowRestaurantService'
import HttpException from '@libraries/HttpException'

jest.mock('@repositories/RestaurantRepository', () =>
  jest.fn().mockImplementation(() => RestaurantRepositoryMock)
)

jest.mock('@repositories/AddressRepository', () =>
  jest.fn().mockImplementation(() => AddressRepositoryMock)
)

describe('Destroy Restaurant Service', () => {
  it('should be instantiated correctly', async () => {
    const restaurantRepository = new RestaurantRepository()
    const addressRepository = new AddressRepository()

    const createRestaurantService = new ShowRestaurantService(
      restaurantRepository,
      addressRepository
    )

    await expect(
      createRestaurantService.execute('a-uuid')
    ).resolves.not.toThrow(Error)
  })

  it('should throw an exception when restaurant is not found', async () => {
    const restaurantRepository = new RestaurantRepository()
    const addressRepository = new AddressRepository()

    const showRestaurantService = new ShowRestaurantService(
      restaurantRepository,
      addressRepository
    )

    restaurantRepository.findOne = async () => undefined

    await expect(
      showRestaurantService.execute('a-uuid')
    ).rejects.toThrow(HttpException)
  })
})
