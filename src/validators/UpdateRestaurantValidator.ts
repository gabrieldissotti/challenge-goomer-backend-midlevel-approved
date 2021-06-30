import * as yup from 'yup'

import HttpValidatorException from '@exceptions/HttpValidatorException'
import { removeUndefinedKeys } from '@utils/functions'

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
  }

  private setupSchema () {
    this.schema = yup.object().shape({
      name: yup.string(),
      photoUrl: yup.string(),
      address: yup.object().shape({
        street: yup.string(),
        number: yup.string(),
        postalCode: yup.string(),
        neighborhood: yup.string()
      })
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
