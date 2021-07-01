import RestaurantRepository from '@repositories/RestaurantRepository'
import RestaurantRepositoryMock from '@mocks/RestaurantRepositoryMock'
import RequestsMock from '@mocks/RequestsMock'
import ListRestaurantsService from '@services/ListRestaurantsService'

jest.mock('@repositories/RestaurantRepository', () =>
  jest.fn().mockImplementation(() => RestaurantRepositoryMock)
)

it('should be instantiated correctly', async () => {
  const restaurantRepository = new RestaurantRepository()

  const createRestaurantService = new ListRestaurantsService(
    restaurantRepository
  )

  await expect(
    createRestaurantService.execute(
      RequestsMock['/restaurants'].GET
    )
  ).resolves.not.toThrow(Error)
})
