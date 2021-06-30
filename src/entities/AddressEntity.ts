export default class AddressEntity {
  public static table: string = 'addresses';
  public static schema: string = 'public';

  public id: string;
  public street: string;
  public number: string;
  public postalCode: string;
  public neighborhood: string;

  public restaurantId: string;

  constructor (result: any) {
    this.id = String(result.id)
    this.street = String(result.street)
    this.number = String(result.number)
    this.postalCode = String(result.postal_code)
    this.neighborhood = String(result.neighborhood)

    this.restaurantId = String(result.restaurant_id)
  }
}
