import { inject, injectable } from 'tsyringe'

import AddressRepository from '@repositories/AddressRepository'
import RestaurantRepository from '@repositories/RestaurantRepository'
import WorkingHourRepository from '@repositories/WorkingHourRepository'

import HttpException from '@exceptions/HttpException'

import { weekdays } from '@utils/constants'

import { Weekday } from '@interfaces/Weekday'
import { AddressDTO } from '@interfaces/AddressDTO'
import { RestaurantDTO } from '@interfaces/RestaurantDTO'
import { WorkingHourToRestaurantDTO } from '@interfaces/WorkingHourDTO'

type ResponseDTO = RestaurantDTO & {
  address: AddressDTO
}

type RequestDTO = {
  name?: string;
  photoUrl?: string;
  address?: {
    id?: string;
    street?: string;
    number?: string;
    postalCode?: string;
    neighborhood?: string;
    restaurantId?: string;
  },
  workingHours?: Array<{
    weekday: Weekday;
    startAt: string;
    finishAt: string;
  }>
}

@injectable()
class UpdateRestaurantService {
  constructor (
    @inject('RestaurantRepository')
    private restaurantRepository: RestaurantRepository,

    @inject('AddressRepository')
    private addressRepository: AddressRepository,

    @inject('WorkingHourRepository')
    private workingHourRepository: WorkingHourRepository
  ) { }

  public async execute (data: RequestDTO, restaurantId: string): Promise<ResponseDTO> {
    if (!data?.address && !data?.name && !data?.photoUrl && !data?.workingHours) {
      throw new HttpException(400, 'You can\'t update a restaurant without least give a field in request body')
    }

    if (data?.workingHours) {
      this.validateWeekdays(data.workingHours)
    }

    let restaurant = []

    restaurant[0] = await this.restaurantRepository.findOne({
      where: {
        id: restaurantId
      }
    })

    if (!restaurant[0]) {
      throw new HttpException(404, 'Restaurant not found')
    }

    const updatedRestaurant =
        await this.restaurantRepository.update({
          where: {
            id: restaurantId
          },
          data: {
            name: data?.name,
            photo_url: data?.photoUrl
          }
        })

    if (updatedRestaurant.length) {
      restaurant = updatedRestaurant
    }

    const address =
        await this.addressRepository.update({
          where: {
            restaurant_id: restaurantId
          },
          data: data?.address
        })

    if (!address.length) {
      address[0] = await this.addressRepository.findOne({
        where: {
          restaurant_id: restaurantId
        }
      })
    }

    await this.updateWorkingHours({
      restaurantId,
      workingHours: data?.workingHours
    })

    const updatedWorkingHours = await this.workingHourRepository.findMany({
      where: {
        restaurant_id: restaurantId
      }
    })

    return {
      ...restaurant[0],
      address: address[0],
      workingHours: updatedWorkingHours
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

  private async updateWorkingHours (params: {
    restaurantId: string,
    workingHours?: WorkingHourToRestaurantDTO[]
  }): Promise<void> {
    const promises = params?.workingHours?.map(async (day: WorkingHourToRestaurantDTO) => {
      const updatedWorkingHour = await this.workingHourRepository.update({
        where: {
          restaurant_id: params.restaurantId,
          weekday: day.weekday
        },
        data: {
          start_at: day.startAt,
          finish_at: day.finishAt
        }
      })

      return updatedWorkingHour[0] || null
    })

    if (!promises) return

    await Promise.all(promises)
  }
}

export default UpdateRestaurantService
