import UpdateRestaurantService from '@services/UpdateRestaurantService'
import RestaurantRepository from '@repositories/RestaurantRepository'
import AddressRepository from '@repositories/AddressRepository'
import RestaurantRepositoryMock from '@mocks/RestaurantRepositoryMock'
import AddressRepositoryMock from '@mocks/AddressRepositoryMock'
import RequestsMock from '@mocks/RequestsMock'
import HttpException from '@exceptions/HttpException'
import WorkingHourRepository from '@repositories/WorkingHourRepository'
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

describe('Update Restaurant Service', () => {
  it('should be instantiated correctly', async () => {
    const restaurantRepository = new RestaurantRepository()
    const addressRepository = new AddressRepository()
    const workingHourRepository = new WorkingHourRepository()

    const updateRestaurantService = new UpdateRestaurantService(
      restaurantRepository,
      addressRepository,
      workingHourRepository
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
    const workingHourRepository = new WorkingHourRepository()

    const updateRestaurantService = new UpdateRestaurantService(
      restaurantRepository,
      addressRepository,
      workingHourRepository
    )

    const response = updateRestaurantService.execute(
      { name: 'Gabe Panquecaria' },
      'a-uuid'
    )

    await expect(
      response
    ).resolves.toHaveProperty('address')
  })

  it('should return a working hours when its not updated', async () => {
    const restaurantRepository = new RestaurantRepository()
    const addressRepository = new AddressRepository()
    const workingHourRepository = new WorkingHourRepository()

    const updateRestaurantService = new UpdateRestaurantService(
      restaurantRepository,
      addressRepository,
      workingHourRepository
    )

    const response = updateRestaurantService.execute(
      { name: 'Gabe Panquecaria' },
      'a-uuid'
    )

    await expect(
      response
    ).resolves.toHaveProperty('workingHours')
  })

  it('should return a restaurant when its not updated', async () => {
    const restaurantRepository = new RestaurantRepository()
    const addressRepository = new AddressRepository()
    const workingHourRepository = new WorkingHourRepository()

    const updateRestaurantService = new UpdateRestaurantService(
      restaurantRepository,
      addressRepository,
      workingHourRepository
    )

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
    ).resolves.toHaveProperty('id')
  })

  it('should throw an exception when no data to update is informed', async () => {
    const restaurantRepository = new RestaurantRepository()
    const addressRepository = new AddressRepository()
    const workingHourRepository = new WorkingHourRepository()

    const updateRestaurantService = new UpdateRestaurantService(
      restaurantRepository,
      addressRepository,
      workingHourRepository
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
    const workingHourRepository = new WorkingHourRepository()

    const updateRestaurantService = new UpdateRestaurantService(
      restaurantRepository,
      addressRepository,
      workingHourRepository
    )

    restaurantRepository.findOne = async () => undefined

    await expect(
      updateRestaurantService.execute(
        {},
        'a-uuid'
      )
    ).rejects.toThrow(HttpException)
  })

  it('should throw an exception when receives duplicated weekdays', async () => {
    const restaurantRepository = new RestaurantRepository()
    const addressRepository = new AddressRepository()
    const workingHourRepository = new WorkingHourRepository()

    const updateRestaurantService = new UpdateRestaurantService(
      restaurantRepository,
      addressRepository,
      workingHourRepository
    )

    const mock = RequestsMock['/restaurants/:id'].PATCH

    mock.workingHours.push({
      weekday: 'sunday',
      startAt: '13:00',
      finishAt: '18:00'
    })

    mock.workingHours.push({
      weekday: 'sunday',
      startAt: '13:00',
      finishAt: '18:00'
    })

    await expect(
      updateRestaurantService.execute(
        mock,
        'a-uuid'
      )
    ).rejects.toThrow(HttpException)
  })

  it('should throw an exception when receives a wrong weekday name', async () => {
    const restaurantRepository = new RestaurantRepository()
    const addressRepository = new AddressRepository()
    const workingHourRepository = new WorkingHourRepository()

    const updateRestaurantService = new UpdateRestaurantService(
      restaurantRepository,
      addressRepository,
      workingHourRepository
    )

    const mock = RequestsMock['/restaurants/:id'].PATCH

    mock.workingHours.push({
      weekday: 'goomer',
      startAt: '13:00',
      finishAt: '18:00'
    })

    await expect(
      updateRestaurantService.execute(
        mock,
        'a-uuid'
      )
    ).rejects.toThrow(HttpException)
  })
})
