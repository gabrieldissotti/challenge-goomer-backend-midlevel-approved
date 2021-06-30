export default class SomeEntity {
  public id: string

  constructor (result: any) {
    this.id = String(result.id)
  }
}
