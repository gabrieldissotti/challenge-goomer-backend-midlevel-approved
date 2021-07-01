import CreateRestaurantService from '@services/CreateRestaurantService'
import RestaurantRepository from '@repositories/RestaurantRepository'
import AddressRepository from '@repositories/AddressRepository'
import RestaurantRepositoryMock from '@mocks/RestaurantRepositoryMock'
import AddressRepositoryMock from '@mocks/AddressRepositoryMock'
import RequestsMock from '@mocks/RequestsMock'
import WorkingHourRepository from '@repositories/WorkingHourRepository'
import WorkingHourRepositoryMock from '@mocks/WorkingHourRepositoryMock'
import HttpException from '@exceptions/HttpException'

jest.mock('@repositories/RestaurantRepository', () =>
  jest.fn().mockImplementation(() => RestaurantRepositoryMock)
)

jest.mock('@repositories/AddressRepository', () =>
  jest.fn().mockImplementation(() => AddressRepositoryMock)
)

jest.mock('@repositories/WorkingHourRepository', () =>
  jest.fn().mockImplementation(() => WorkingHourRepositoryMock)
)

describe('Create Restaurant Service', () => {
  it('should be instantiated correctly', async () => {
    const restaurantRepository = new RestaurantRepository()
    const addressRepository = new AddressRepository()
    const workingHourRepository = new WorkingHourRepository()

    const createRestaurantService = new CreateRestaurantService(
      restaurantRepository,
      addressRepository,
      workingHourRepository
    )

    await expect(
      createRestaurantService.execute(
        RequestsMock['/restaurants'].POST
      )
    ).resolves.not.toThrow(Error)
  })

  it('should throw an exception when receives duplicated weekdays', async () => {
    const restaurantRepository = new RestaurantRepository()
    const addressRepository = new AddressRepository()
    const workingHourRepository = new WorkingHourRepository()

    const createRestaurantService = new CreateRestaurantService(
      restaurantRepository,
      addressRepository,
      workingHourRepository
    )

    const mock = RequestsMock['/restaurants'].POST

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
      createRestaurantService.execute(
        mock
      )
    ).rejects.toThrow(HttpException)
  })

  it('should throw an exception when receives a wrong weekday name', async () => {
    const restaurantRepository = new RestaurantRepository()
    const addressRepository = new AddressRepository()
    const workingHourRepository = new WorkingHourRepository()

    const createRestaurantService = new CreateRestaurantService(
      restaurantRepository,
      addressRepository,
      workingHourRepository
    )

    const mock = RequestsMock['/restaurants'].POST

    mock.workingHours.push({
      weekday: 'goomer',
      startAt: '13:00',
      finishAt: '18:00'
    })

    await expect(
      createRestaurantService.execute(
        mock
      )
    ).rejects.toThrow(HttpException)
  })
})
