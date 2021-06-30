import CreateRestaurantService from '@services/CreateRestaurantService'
import RestaurantRepository from '@repositories/RestaurantRepository'
import AddressRepository from '@repositories/AddressRepository'
import RestaurantRepositoryMock from '@mocks/RestaurantRepositoryMock'
import AddressRepositoryMock from '@mocks/AddressRepositoryMock'
import RequestsMock from '@mocks/RequestsMock'

jest.mock('@repositories/RestaurantRepository', () =>
  jest.fn().mockImplementation(() => RestaurantRepositoryMock)
)

jest.mock('@repositories/AddressRepository', () =>
  jest.fn().mockImplementation(() => AddressRepositoryMock)
)

it('should be instantiated correctly', async () => {
  const restaurantRepository = new RestaurantRepository()
  const addressRepository = new AddressRepository()

  const createRestaurantService = new CreateRestaurantService(
    restaurantRepository,
    addressRepository
  )

  await expect(
    createRestaurantService.execute(
      RequestsMock['/restaurants'].POST
    )
  ).resolves.not.toThrow(Error)
})
