import { inject, injectable } from 'tsyringe'

import AddressRepository from '@repositories/AddressRepository'
import RestaurantRepository from '@repositories/RestaurantRepository'
import WorkingHourRepository from '@repositories/WorkingHourRepository'

import HttpException from '@exceptions/HttpException'

import { weekdays } from '@utils/constants'

import { AddressDTO } from '@interfaces/AddressDTO'
import { RestaurantDTO } from '@interfaces/RestaurantDTO'
import { WorkingHourToRestaurantDTO } from '@interfaces/WorkingHourDTO'

type ResponseDTO = RestaurantDTO & {
  address: AddressDTO
  workingHours: WorkingHourToRestaurantDTO[]
}

type RequestDTO = Omit<ResponseDTO, 'id'>

@injectable()
class CreateRestaurantService {
  constructor (
    @inject('RestaurantRepository')
    private restaurantRepository: RestaurantRepository,

    @inject('AddressRepository')
    private addressRepository: AddressRepository,

    @inject('WorkingHourRepository')
    private workingHourRepository: WorkingHourRepository
  ) { }

  public async execute (data: RequestDTO): Promise<ResponseDTO> {
    const {
      address: addressData,
      workingHours: workingHoursData,
      ...restaurantData
    } = data

    if (data?.workingHours) {
      this.validateWeekdays(data.workingHours)
    }

    const restaurant: RestaurantDTO =
      await this.restaurantRepository.create(
        restaurantData
      )

    const address: AddressDTO =
      await this.addressRepository.create({
        ...addressData,
        restaurantId: restaurant.id
      })

    if (!workingHoursData.length) {
      return {
        ...restaurant,
        address,
        workingHours: []
      }
    }

    const workingHoursToSave = workingHoursData.map(
      (day: WorkingHourToRestaurantDTO) => ({
        ...day,
        restaurantId: restaurant.id
      }))

    const workingHours: WorkingHourToRestaurantDTO[] =
      await this.workingHourRepository.createManyToRestaurant(
        workingHoursToSave
      )

    return {
      ...restaurant,
      address,
      workingHours
    }
  }

  private validateWeekdays (workingHours: WorkingHourToRestaurantDTO[]) {
    const alreadyChecked: WorkingHourToRestaurantDTO[] = []

    workingHours.forEach((day) => {
      if (alreadyChecked.find(
        alreadyCheckedDay => alreadyCheckedDay.weekday === day.weekday)
      ) {
        throw new HttpException(400, `weekday ${day.weekday} is duplicated in request body`)
      }

      if (!weekdays.includes(String(day.weekday))) {
        throw new HttpException(400, `weekday ${day.weekday} does not exists`)
      }

      alreadyChecked.push(day)
    })
  }
}

export default CreateRestaurantService
