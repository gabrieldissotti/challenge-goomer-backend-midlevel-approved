import * as yup from 'yup'

import HttpValidatorException from '@exceptions/HttpValidatorException'

class SomeValidator {
  private schema: any;
  public test?: number;

  constructor (data: any) {
    this.setupSchema()

    this.test = data.test
  }

  private setupSchema () {
    this.schema = yup.object().shape({
      test: yup
        .string()
        .required()
    })
  }

  public async validate () {
    await this.schema.validate(this).catch(function (err: any) {
      throw new HttpValidatorException(err.errors)
    })
  }

  public getExpectedParams (): Omit<SomeValidator, 'validate'> {
    const {
      validate: validateFunction,
      ...expectedParams
    } = this

    return expectedParams
  }
}

export default SomeValidator
