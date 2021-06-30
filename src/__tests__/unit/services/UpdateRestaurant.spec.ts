import UpdateRestaurantService from '@services/UpdateRestaurantService'
import RestaurantRepository from '@repositories/RestaurantRepository'
import AddressRepository from '@repositories/AddressRepository'
import RestaurantRepositoryMock from '@mocks/RestaurantRepositoryMock'
import AddressRepositoryMock from '@mocks/AddressRepositoryMock'
import RequestsMock from '@mocks/RequestsMock'
import HttpException from '@libraries/HttpException'
import { promisify } from 'util'

jest.mock('@repositories/RestaurantRepository', () =>
  jest.fn().mockImplementation(() => RestaurantRepositoryMock)
)

jest.mock('@repositories/AddressRepository', () =>
  jest.fn().mockImplementation(() => AddressRepositoryMock)
)

describe('Update Restaurant Service', () => {
  it('should be instantiated correctly', async () => {
    const restaurantRepository = new RestaurantRepository()
    const addressRepository = new AddressRepository()

    const updateRestaurantService = new UpdateRestaurantService(
      restaurantRepository,
      addressRepository
    )

    await expect(
      updateRestaurantService.execute(
        RequestsMock['/restaurants/:id'].PATCH,
        'a-uuid'
      )
    ).resolves.not.toThrow(Error)
  })

  it('should return a address when its not updated', async () => {
    const restaurantRepository = new RestaurantRepository()
    const addressRepository = new AddressRepository()

    const updateRestaurantService = new UpdateRestaurantService(
      restaurantRepository,
      addressRepository
    )

    const response = updateRestaurantService.execute(
      { name: 'Gabe Panquecaria' },
      'a-uuid'
    )

    await expect(
      response
    ).resolves.toHaveProperty('address')
  })

  it('should return a restaurant when its not updated', async () => {
    const restaurantRepository = new RestaurantRepository()
    const addressRepository = new AddressRepository()

    const updateRestaurantService = new UpdateRestaurantService(
      restaurantRepository,
      addressRepository
    )

    restaurantRepository.update = promisify(() => ([]))

    const response = updateRestaurantService.execute(
      {
        address: {
          number: '123'
        }
      },
      'a-uuid'
    )

    await expect(
      response
    ).resolves.toHaveProperty('restaurant')
  })

  it('should throw an exception when no data to update is informed', async () => {
    const restaurantRepository = new RestaurantRepository()
    const addressRepository = new AddressRepository()

    const updateRestaurantService = new UpdateRestaurantService(
      restaurantRepository,
      addressRepository
    )

    await expect(
      updateRestaurantService.execute(
        {},
        'a-uuid'
      )
    ).rejects.toThrow(HttpException)
  })

  it('should throw an exception when restaurant is not found', async () => {
    const restaurantRepository = new RestaurantRepository()
    const addressRepository = new AddressRepository()

    const updateRestaurantService = new UpdateRestaurantService(
      restaurantRepository,
      addressRepository
    )

    restaurantRepository.findOne = promisify(() => ({}))

    await expect(
      updateRestaurantService.execute(
        {},
        'a-uuid'
      )
    ).rejects.toThrow(HttpException)
  })
})
