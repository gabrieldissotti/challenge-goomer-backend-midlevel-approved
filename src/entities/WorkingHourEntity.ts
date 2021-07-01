export default class WorkingHourEntity {
  public static table: string = 'working_hours';
  public static schema: string = 'public';

  public id: string;
  public weekday: string;
  public startAt: Date;
  public finishAt: Date;

  public productId: string;
  public promotionId: string;

  public createdAt: Date;
  public updatedAt: Date;

  constructor (result: any) {
    this.id = String(result.id)
    this.weekday = String(result.weekday)
    this.startAt = new Date(result.start_at)
    this.finishAt = new Date(result.finish_at)
    this.productId = String(result.product_id)
    this.promotionId = String(result.promotion_id)

    this.createdAt = new Date(result.created_at)
    this.updatedAt = new Date(result.updated_at)
  }
}
