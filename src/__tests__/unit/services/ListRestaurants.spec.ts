import RestaurantRepository from '@repositories/RestaurantRepository'
import AddressRepository from '@repositories/AddressRepository'
import RestaurantRepositoryMock from '@mocks/RestaurantRepositoryMock'
import AddressRepositoryMock from '@mocks/AddressRepositoryMock'
import RequestsMock from '@mocks/RequestsMock'
import ListRestaurantsService from '@services/ListRestaurantsService'

jest.mock('@repositories/RestaurantRepository', () =>
  jest.fn().mockImplementation(() => RestaurantRepositoryMock)
)

jest.mock('@repositories/AddressRepository', () =>
  jest.fn().mockImplementation(() => AddressRepositoryMock)
)

it('should be instantiated correctly', async () => {
  const restaurantRepository = new RestaurantRepository()
  const addressRepository = new AddressRepository()

  const createRestaurantService = new ListRestaurantsService(
    restaurantRepository,
    addressRepository
  )

  await expect(
    createRestaurantService.execute(
      RequestsMock['/restaurants'].GET
    )
  ).resolves.not.toThrow(Error)
})
