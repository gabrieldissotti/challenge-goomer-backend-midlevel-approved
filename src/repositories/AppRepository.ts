import Connection from '@database/Connection'
import { FindAllParams, FindManyParams, FindOneParams, UpdateParams } from '@interfaces/AppRepositoryDTO'
import { removeUndefinedKeys } from '@utils/functions'

type ConstructorParams = {
  table: string;
  schema: string;
}

class AppRepository {
  public table: string;
  public schema: string;

  constructor ({
    table,
    schema
  }: ConstructorParams) {
    this.table = table
    this.schema = schema
  }

  public async connect () {
    const database = new Connection()

    const connection = await database.getConnectionInstance()

    return connection
  }

  async findAll ({
    page,
    pagesize,
    select,
    where
  }: FindAllParams): Promise<any> {
    const connection = await this.connect()

    const totalResults = await connection(this.table)
      .withSchema(this.schema)
      .where(where || {})
      .select(connection.raw('count(id) OVER() as total'))

    const totalItems = Number(totalResults[0]?.total || 0)

    const results = await connection(this.table)
      .withSchema(this.schema)
      .limit(pagesize)
      .where(where || {})
      .offset((page - 1) * pagesize)
      .select(select || '*')

    return {
      pagination: {
        page,
        totalPages: Math.ceil(totalItems / pagesize),
        pagesize,
        totalItems
      },
      items: results
    }
  }

  async findMany ({
    where,
    select
  }: FindManyParams): Promise<any> {
    const connection = await this.connect()

    const results = await connection(this.table)
      .withSchema(this.schema)
      .where(where)
      .select(select || '*')

    return results
  }

  async findOne ({
    where,
    select
  }: FindOneParams): Promise<any> {
    const connection = await this.connect()

    return connection(this.table)
      .withSchema(this.schema)
      .where(where)
      .select(select || '*')
      .first()
  }

  async update ({
    where,
    data
  }: UpdateParams): Promise<any[]> {
    const sanitizedData = removeUndefinedKeys(data)

    if (!sanitizedData || Object.keys(sanitizedData).length === 0) return []

    const connection = await this.connect()

    return connection(this.table)
      .withSchema(this.schema)
      .where(where)
      .update(sanitizedData)
      .returning('*')
  }

  async delete (where: any): Promise<any> {
    const connection = await this.connect()
    return connection(this.table).withSchema(this.schema).del().where(where)
  }

  async save (data: any, returning = null): Promise<any> {
    const connection = await this.connect()
    return connection(this.table)
      .withSchema(this.schema)
      .insert(data)
      .returning(returning || '*')
  }
}

export default AppRepository
