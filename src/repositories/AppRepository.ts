import Connection from '@database/Connection'
import { FindAllParams, FindManyParams, FindOneParams, UpdateParams } from '@interfaces/AppRepositoryDTO'
import { removeUndefinedKeys } from '@utils/functions'

class AppRepository {
  public table: string;
  public schema: string;

  public Entity: any;

  constructor (entity: any) {
    this.table = entity.table
    this.schema = entity.schema
    this.Entity = entity
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

    return results.map(item => new this.Entity(item))
  }

  async findOne ({
    where,
    select
  }: FindOneParams): Promise<any> {
    const connection = await this.connect()

    const result = await connection(this.table)
      .withSchema(this.schema)
      .where(where)
      .select(select || '*')
      .first()

    return new this.Entity(result)
  }

  async update ({
    where,
    data
  }: UpdateParams): Promise<any[]> {
    const sanitizedData = removeUndefinedKeys(data)

    if (!sanitizedData || Object.keys(sanitizedData).length === 0) return []

    const connection = await this.connect()

    const updatedItems = await connection(this.table)
      .withSchema(this.schema)
      .where(where)
      .update(sanitizedData)
      .returning('*')

    return updatedItems.map(item => new this.Entity(item))
  }

  async delete (where: any): Promise<any> {
    const connection = await this.connect()
    return connection(this.table).withSchema(this.schema).del().where(where)
  }

  async save (data: any, returning = null): Promise<any> {
    const connection = await this.connect()

    const result = await connection(this.table)
      .withSchema(this.schema)
      .insert(data)
      .returning(returning || '*')

    if (result.length === 1) {
      return new this.Entity(result[0])
    }

    return result.map(item => new this.Entity(item))
  }
}

export default AppRepository
