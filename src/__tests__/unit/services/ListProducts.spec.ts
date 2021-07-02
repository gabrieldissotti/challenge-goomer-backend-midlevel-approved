import ProductRepository from '@repositories/ProductRepository'
import RestaurantRepository from '@repositories/RestaurantRepository'

import ListProductsService from '@services/ListProductsService'

import ProductRepositoryMock from '@mocks/ProductRepositoryMock'
import RestaurantRepositoryMock from '@mocks/RestaurantRepositoryMock'

jest.mock('@repositories/RestaurantRepository', () =>
  jest.fn().mockImplementation(() => RestaurantRepositoryMock)
)

jest.mock('@repositories/ProductRepository', () =>
  jest.fn().mockImplementation(() => ProductRepositoryMock)
)

it('should be instantiated correctly', async () => {
  const restaurantRepository = new RestaurantRepository()
  const productsRepository = new ProductRepository()

  const listProductsService = new ListProductsService(
    restaurantRepository,
    productsRepository
  )

  await expect(
    listProductsService.execute(
      {
        page: 1,
        pagesize: 2
      },
      'restaurantId'
    )
  ).resolves.not.toThrow(Error)
})
