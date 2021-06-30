export default class RestaurantEntity {
  public static table: string = 'restaurants';
  public static schema: string = 'public';

  public id: string
  public name: string
  public photoUrl: string

  constructor (result: any) {
    this.id = String(result.id)
    this.name = String(result.name)
    this.photoUrl = String(result.photo_url)
  }
}
