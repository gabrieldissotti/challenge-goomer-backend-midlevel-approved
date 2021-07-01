import * as yup from 'yup'

import HttpValidatorException from '@exceptions/HttpValidatorException'
import { regexToValidateTime } from '@configs/app'
import { WorkingHourToPromotionDTO } from '@interfaces/WorkingHourDTO'

class CreateProductValidator {
  private schema: any;

  public name: string;
  public photoUrl: string;
  public price: number;
  public categoryId: string;

  public promotion?: {
    description: string;
    price: number;
    workingHours: WorkingHourToPromotionDTO[]
  };

  constructor (data: any) {
    this.setupSchema()

    this.name = String(data?.name)
    this.photoUrl = String(data?.photoUrl)
    this.price = data?.price
    this.categoryId = data?.categoryId

    this.promotion = data?.promotion
  }

  private setupSchema () {
    const timeErrorMessageDefault =
      'time format to working hour in startAt is wrong. The pattern allowed is hh:mm and between 00:00 and 23:59'

    this.schema = yup.object().shape({
      name: yup.string().required(),
      photoUrl: yup.string().required(),
      price: yup.number().positive().required(),
      categoryId: yup.string().required()
    })

    if (this.promotion) {
      this.schema.promotion = yup.object().shape({
        description: yup.string().required(),
        price: yup.number().positive().required(),
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
  }

  public async validate () {
    await this.schema.validate(this).catch(function (err: any) {
      throw new HttpValidatorException(err.errors)
    })
  }

  public getExpectedParams (): Omit<CreateProductValidator, 'validate'> {
    const {
      validate: validateFunction,
      schema,
      ...expectedParams
    } = this

    return expectedParams
  }
}

export default CreateProductValidator
