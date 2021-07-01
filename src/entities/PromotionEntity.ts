export default class PromotionEntity {
  public static table: string = 'promotions';
  public static schema: string = 'public';

  public id: string;
  public description: string;
  public price: number;

  public createdAt: Date;
  public updatedAt: Date;

  constructor (result: any) {
    this.id = String(result.id)
    this.description = String(result.description)
    this.description = String(result.description)
    this.price = Number(result.price)

    this.createdAt = new Date(result.created_at)
    this.updatedAt = new Date(result.updated_at)
  }
}
