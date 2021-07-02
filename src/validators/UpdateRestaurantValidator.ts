import * as yup from 'yup'

import HttpValidatorException from '@exceptions/HttpValidatorException'

import { regexToValidateTime } from '@configs/app'

import { removeUndefinedKeys } from '@utils/functions'

import { Weekday } from '@interfaces/Weekday'

class UpdateRestaurantValidator {
  private schema: any;

  public name?: string;
  public photoUrl?: string;
  public address?: {
    street?: string;
    number?: string;
    postalCode?: string;
    neighborhood?: string;
  };

  public workingHours: Array<{
    weekday: Weekday;
    startAt: string;
    finishAt: string;
  }>;

  constructor (data: any) {
    this.setupSchema()

    this.name = data?.name
    this.photoUrl = data?.photoUrl

    this.address = {
      street: data?.address?.street,
      number: data?.address?.number,
      postalCode: data?.address?.postalCode,
      neighborhood: data?.address?.neighborhood
    }

    this.workingHours = data?.workingHours?.map((day: any) => ({
      weekday: day.weekday,
      startAt: String(day.startAt),
      finishAt: String(day.finishAt)
    }))
  }

  private setupSchema () {
    const timeErrorMessageDefault =
      'time format to working hour in startAt is wrong. The pattern allowed is hh:mm and between 00:00 and 23:59'

    this.schema = yup.object().shape({
      name: yup.string(),
      photoUrl: yup.string(),
      address: yup.object().shape({
        street: yup.string(),
        number: yup.string(),
        postalCode: yup.string(),
        neighborhood: yup.string()
      }),
      workingHours: yup.array().of(
        yup.object().shape({
          weekday: yup.string().required(),
          startAt: yup
            .string()
            .trim()
            .matches(regexToValidateTime, timeErrorMessageDefault)
            .required(),
          finishAt: yup
            .string()
            .trim()
            .matches(regexToValidateTime, timeErrorMessageDefault)
            .required()
        })
      )
    })
  }

  public async validate () {
    await this.schema.validate(this).catch(function (err: any) {
      throw new HttpValidatorException(err.errors)
    })
  }

  public getExpectedParams (): Omit<UpdateRestaurantValidator, 'validate'> {
    const {
      validate: validateFunction,
      schema,
      ...expectedParams
    } = this

    return removeUndefinedKeys(expectedParams)
  }
}

export default UpdateRestaurantValidator
