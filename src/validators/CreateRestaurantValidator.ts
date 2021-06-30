import * as yup from 'yup'

import HttpValidatorException from '@exceptions/HttpValidatorException'

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
      name: yup.string().required(),
      photoUrl: yup.string().required(),
      address: yup.object().shape({
        street: yup.string().required(),
        number: yup.string().required(),
        postalCode: yup.string().required(),
        neighborhood: yup.string().required()
      })
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
      ...expectedParams
    } = this

    return expectedParams
  }
}

export default CreateRestaurantValidator
