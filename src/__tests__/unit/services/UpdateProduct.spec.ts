import { container } from 'tsyringe'

import RestaurantRepository from '@repositories/RestaurantRepository'
import RestaurantRepositoryMock from '@mocks/RestaurantRepositoryMock'
import RequestsMock from '@mocks/RequestsMock'
import WorkingHourRepository from '@repositories/WorkingHourRepository'
import WorkingHourRepositoryMock from '@mocks/WorkingHourRepositoryMock'
import HttpException from '@exceptions/HttpException'
import ProductRepository from '@repositories/ProductRepository'
import PromotionRepository from '@repositories/PromotionRepository'
import UpdateProductService from '@services/UpdateProductService'
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

    const updateProduct = new UpdateProductService(
      restaurantRepository,
      productRepository,
      workingHourRepository,
      promotionRepository
    )

    const mock: any = RequestsMock['/restaurants/:id/products'].PATCH

    await expect(
      updateProduct.execute(
        mock,
        'restaurant-uuid',
        'product-uuid'
      )
    ).resolves.not.toThrow(Error)
  })

  it('should throw an exception when receives duplicated weekdays', async () => {
    const restaurantRepository = container.resolve(RestaurantRepository)
    const productRepository = container.resolve(ProductRepository)
    const workingHourRepository = container.resolve(WorkingHourRepository)
    const promotionRepository = container.resolve(PromotionRepository)

    const updateProductService = new UpdateProductService(
      restaurantRepository,
      productRepository,
      workingHourRepository,
      promotionRepository
    )

    const mock: any = RequestsMock['/restaurants/:id/products'].PATCH

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
      updateProductService.execute(
        mock,
        'restaurant-uuid',
        'product-uuid'
      )
    ).rejects.toThrow(HttpException)
  })

  it('should throw an exception when receives a wrong weekday name', async () => {
    const restaurantRepository = container.resolve(RestaurantRepository)
    const productRepository = container.resolve(ProductRepository)
    const workingHourRepository = container.resolve(WorkingHourRepository)
    const promotionRepository = container.resolve(PromotionRepository)

    const updateProductService = new UpdateProductService(
      restaurantRepository,
      productRepository,
      workingHourRepository,
      promotionRepository
    )

    const mock: any = RequestsMock['/restaurants/:id/products'].PATCH

    mock.promotion.workingHours.push({
      weekday: 'goomer',
      startAt: '13:00',
      finishAt: '18:00'
    })

    await expect(
      updateProductService.execute(
        mock,
        'restaurant-uuid',
        'product-uuid'
      )
    ).rejects.toThrow(HttpException)
  })

  it('should return promotion null when is not sent is payload', async () => {
    const restaurantRepository = container.resolve(RestaurantRepository)
    const productRepository = container.resolve(ProductRepository)
    const workingHourRepository = container.resolve(WorkingHourRepository)
    const promotionRepository = container.resolve(PromotionRepository)

    const updateProductService = new UpdateProductService(
      restaurantRepository,
      productRepository,
      workingHourRepository,
      promotionRepository
    )

    const { promotion, ...mockWithoutPromotion }: any = RequestsMock['/restaurants/:id/products'].POST

    await expect(
      updateProductService.execute(
        mockWithoutPromotion,
        'restaurant-uuid',
        'product-id'
      )
    ).resolves.toHaveProperty('promotion')
  })

  it('should throw an exception when product does not exists', async () => {
    const restaurantRepository = container.resolve(RestaurantRepository)
    const productRepository = container.resolve(ProductRepository)
    const workingHourRepository = container.resolve(WorkingHourRepository)
    const promotionRepository = container.resolve(PromotionRepository)

    productRepository.findOne = async () => undefined

    const updateProductService = new UpdateProductService(
      restaurantRepository,
      productRepository,
      workingHourRepository,
      promotionRepository
    )

    const mock: any = RequestsMock['/restaurants/:id/products'].POST

    await expect(
      updateProductService.execute(
        mock,
        'restaurant-uuid',
        'product-uuid'
      )
    ).rejects.toThrow(HttpException)
  })

  it('should throw an exception when restaurant does not exists', async () => {
    const restaurantRepository = container.resolve(RestaurantRepository)
    const productRepository = container.resolve(ProductRepository)
    const workingHourRepository = container.resolve(WorkingHourRepository)
    const promotionRepository = container.resolve(PromotionRepository)

    restaurantRepository.findOne = async () => undefined

    const updateProductService = new UpdateProductService(
      restaurantRepository,
      productRepository,
      workingHourRepository,
      promotionRepository
    )

    const mock: any = RequestsMock['/restaurants/:id/products'].POST

    await expect(
      updateProductService.execute(
        mock,
        'restaurant-uuid',
        'product-uuid'
      )
    ).rejects.toThrow(HttpException)
  })
})
