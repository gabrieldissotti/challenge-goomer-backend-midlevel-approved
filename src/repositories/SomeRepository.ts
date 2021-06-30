import SomeEntity from 'src/entities/SomeEntity'
import AppRepository from './AppRepository'

type Result = {
  id: string
} | void | undefined;

export default class SomeRepository extends AppRepository {
  constructor () {
    super({
      table: 'something',
      schema: 'public'
    })
  }

  public async getSomething (): Promise<SomeEntity | {}> {
    const result: Result = await this.findOne({}, '*')

    if (!result) return {}

    const entity = new SomeEntity(result)

    return entity
  }
}
