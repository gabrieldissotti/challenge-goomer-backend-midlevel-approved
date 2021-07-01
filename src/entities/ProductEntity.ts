export default class ProductEntity {
  public static table: string = 'products';
  public static schema: string = 'public';

  public id: string;
  public name: string;
  public photoUrl: string;
  public price: number;

  public categoryId: string;
  public restaurantId: string;

  public createdAt: Date;
  public updatedAt: Date;

  constructor (result: any) {
    this.id = String(result.id)
    this.name = String(result.name)
    this.photoUrl = String(result.photo_url)
    this.price = Number(result.price)

    this.categoryId = String(result.category_id)
    this.restaurantId = String(result.restaurant_id)

    this.createdAt = new Date(result.created_at)
    this.updatedAt = new Date(result.updated_at)
  }
}
