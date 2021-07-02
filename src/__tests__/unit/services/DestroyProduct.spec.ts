import RestaurantRepository from '@repositories/RestaurantRepository'
import RestaurantRepositoryMock from '@mocks/RestaurantRepositoryMock'
import ProductRepository from '@repositories/ProductRepository'
import DestroyProductService from '@services/DestroyProductService'
import ProductRepositoryMock from '@mocks/ProductRepositoryMock'

jest.mock('@repositories/RestaurantRepository', () =>
  jest.fn().mockImplementation(() => RestaurantRepositoryMock)
)

jest.mock('@repositories/ProductRepository', () =>
  jest.fn().mockImplementation(() => ProductRepositoryMock)
)

describe('Destroy Product Service', () => {
  it('should be instantiated correctly', async () => {
    const restaurantRepository = new RestaurantRepository()
    const productRepository = new ProductRepository()

    const createProductService = new DestroyProductService(
      restaurantRepository,
      productRepository
    )

    await expect(
      createProductService.execute(
        'restaurant-id',
        'product-id'
      )
    ).resolves.not.toThrow(Error)
  })
})
