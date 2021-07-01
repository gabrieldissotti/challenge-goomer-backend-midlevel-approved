import { container } from 'tsyringe'

import RestaurantRepository from '@repositories/RestaurantRepository'
import RestaurantRepositoryMock from '@mocks/RestaurantRepositoryMock'
import RequestsMock from '@mocks/RequestsMock'
import WorkingHourRepository from '@repositories/WorkingHourRepository'
import WorkingHourRepositoryMock from '@mocks/WorkingHourRepositoryMock'
import HttpException from '@libraries/HttpException'
import ProductRepository from '@repositories/ProductRepository'
import PromotionRepository from '@repositories/PromotionRepository'
import CreateProductService from '@services/CreateProductService'
import ProductRepositoryMock from '@mocks/ProductRepositoryMock'
import PromotionRepositoryMock from '@mocks/PromotionRepositoryMock'

jest.mock('@repositories/RestaurantRepository', () =>
  jest.fn().mockImplementation(() => RestaurantRepositoryMock)
)

jest.mock('@repositories/ProductRepository', () =>
  jest.fn().mockImplementation(() => ProductRepositoryMock)
)

jest.mock('@repositories/PromotionRepository', () =>
  jest.fn().mockImplementation(() => PromotionRepositoryMock)
)

jest.mock('@repositories/WorkingHourRepository', () =>
  jest.fn().mockImplementation(() => WorkingHourRepositoryMock)
)

describe('Create Product Service', () => {
  it('should be instantiated correctly', async () => {
    const restaurantRepository = container.resolve(RestaurantRepository)
    const productRepository = container.resolve(ProductRepository)
    const workingHourRepository = container.resolve(WorkingHourRepository)
    const promotionRepository = container.resolve(PromotionRepository)

    const createProductService = new CreateProductService(
      restaurantRepository,
      productRepository,
      workingHourRepository,
      promotionRepository
    )

    await expect(
      createProductService.execute(
        RequestsMock['/restaurants/:id/products'].POST,
        'restaurant-uuid'
      )
    ).resolves.not.toThrow(Error)
  })

  it('should throw an exception when receives duplicated weekdays', async () => {
    const restaurantRepository = container.resolve(RestaurantRepository)
    const productRepository = container.resolve(ProductRepository)
    const workingHourRepository = container.resolve(WorkingHourRepository)
    const promotionRepository = container.resolve(PromotionRepository)

    const createProductService = new CreateProductService(
      restaurantRepository,
      productRepository,
      workingHourRepository,
      promotionRepository
    )

    const mock = RequestsMock['/restaurants/:id/products'].POST

    mock.promotion.workingHours.push({
      weekday: 'sunday',
      startAt: '13:00',
      finishAt: '18:00'
    })

    mock.promotion.workingHours.push({
      weekday: 'sunday',
      startAt: '13:00',
      finishAt: '18:00'
    })

    await expect(
      createProductService.execute(
        mock,
        'restaurant-uuid'
      )
    ).rejects.toThrow(HttpException)
  })

  it('should throw an exception when receives a wrong weekday name', async () => {
    const restaurantRepository = container.resolve(RestaurantRepository)
    const productRepository = container.resolve(ProductRepository)
    const workingHourRepository = container.resolve(WorkingHourRepository)
    const promotionRepository = container.resolve(PromotionRepository)

    const createProductService = new CreateProductService(
      restaurantRepository,
      productRepository,
      workingHourRepository,
      promotionRepository
    )

    const mock = RequestsMock['/restaurants/:id/products'].POST

    mock.promotion.workingHours.push({
      weekday: 'goomer',
      startAt: '13:00',
      finishAt: '18:00'
    })

    await expect(
      createProductService.execute(
        mock,
        'restaurant-uuid'
      )
    ).rejects.toThrow(HttpException)
  })

  it('should return promotion null when is not sent is payload', async () => {
    const restaurantRepository = container.resolve(RestaurantRepository)
    const productRepository = container.resolve(ProductRepository)
    const workingHourRepository = container.resolve(WorkingHourRepository)
    const promotionRepository = container.resolve(PromotionRepository)

    const createProductService = new CreateProductService(
      restaurantRepository,
      productRepository,
      workingHourRepository,
      promotionRepository
    )

    const { promotion, ...mockWithoutPromotion }: any = RequestsMock['/restaurants/:id/products'].POST

    await expect(
      createProductService.execute(
        mockWithoutPromotion,
        'restaurant-uuid'
      )
    ).resolves.toHaveProperty('promotion')
  })

  it('should throw an exception when sent promotion without working hours/weekdays', async () => {
    const restaurantRepository = container.resolve(RestaurantRepository)
    const productRepository = container.resolve(ProductRepository)
    const workingHourRepository = container.resolve(WorkingHourRepository)
    const promotionRepository = container.resolve(PromotionRepository)

    const createProductService = new CreateProductService(
      restaurantRepository,
      productRepository,
      workingHourRepository,
      promotionRepository
    )

    const {
      promotion: {
        workingHours,
        ...promotion
      },
      ...product
    }: any = RequestsMock['/restaurants/:id/products'].POST

    await expect(
      createProductService.execute(
        {
          ...product,
          promotion
        },
        'restaurant-uuid'
      )
    ).rejects.toThrow(HttpException)
  })
})
