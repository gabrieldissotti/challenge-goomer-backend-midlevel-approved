import * as yup from 'yup'

import HttpValidatorException from '@exceptions/HttpValidatorException'
import { Weekday } from '@interfaces/Weekday'
import { regexToValidateTime } from '@configs/app'

class CreateRestaurantValidator {
  private schema: any;

  public name: string;
  public photoUrl: string;
  public address: {
    street: string;
    number: string;
    postalCode: string;
    neighborhood: string;
  };

  public workingHours: Array<{
    weekday: Weekday;
    startAt: string;
    finishAt: string;
  }>;

  constructor (data: any) {
    this.setupSchema()

    this.name = String(data?.name)
    this.photoUrl = String(data?.photoUrl)
    this.address = data?.address
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
      name: yup.string().required(),
      photoUrl: yup.string().required(),
      address: yup.object().shape({
        street: yup.string().required(),
        number: yup.string().required(),
        postalCode: yup.string().required(),
        neighborhood: yup.string().required()
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

  public getExpectedParams (): Omit<CreateRestaurantValidator, 'validate'> {
    const {
      validate: validateFunction,
      schema,
      ...expectedParams
    } = this

    return expectedParams
  }
}

export default CreateRestaurantValidator
