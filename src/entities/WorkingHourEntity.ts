export default class WorkingHourEntity {
  public static table: string = 'working_hours';
  public static schema: string = 'public';

  public id: string;
  public weekday: string;
  public startAt: Date;
  public finishAt: Date;

  public productId: string | null;
  public promotionId: string | null;

  public createdAt: Date;
  public updatedAt: Date;

  constructor (result: any) {
    this.id = String(result.id)
    this.weekday = String(result.weekday)
    this.startAt = new Date(result.start_at)
    this.finishAt = new Date(result.finish_at)

    this.productId = result?.product_id ? String(result.product_id) : null
    this.promotionId = result?.promotion_id ? String(result.promotion_id) : null

    this.createdAt = new Date(result.created_at)
    this.updatedAt = new Date(result.updated_at)
  }
}
