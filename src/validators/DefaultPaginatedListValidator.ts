import * as yup from 'yup'

import HttpValidatorException from '@exceptions/HttpValidatorException'

import { paginationDefault } from '@configs/app'

class DefaultPaginatedListValidator {
  private schema: any;

  public page: number;
  public pagesize: number;

  constructor (data: any) {
    this.setupSchema()

    this.page = Number(data?.page || paginationDefault.page)
    this.pagesize = Number(data?.pagesize || paginationDefault.pagesize)
  }

  private setupSchema () {
    this.schema = yup.object().shape({
      page: yup.number().integer().positive(),
      pagesize: yup.number().integer().positive()
    })
  }

  public async validate () {
    await this.schema.validate(this).catch(function (err: any) {
      throw new HttpValidatorException(err.errors)
    })
  }

  public getExpectedParams (): Omit<DefaultPaginatedListValidator, 'validate'> {
    const {
      validate: validateFunction,
      schema,
      ...expectedParams
    } = this

    return expectedParams
  }
}

export default DefaultPaginatedListValidator
