import { Weekday } from '@utils/enums'

export default class WorkingHourEntity {
  public static table: string = 'working_hours';
  public static schema: string = 'public';

  public id: string;
  public weekday: Weekday;
  public startAt: string;
  public finishAt: string;

  public restaurantId: string | null;
  public promotionId: string | null;

  public createdAt: Date;
  public updatedAt: Date;

  constructor (result: any) {
    this.id = String(result.id)
    this.weekday = result.weekday
    this.startAt = String(result.start_at)
    this.finishAt = String(result.finish_at)

    this.restaurantId = result?.restaurant_id ? String(result.restaurant_id) : null
    this.promotionId = result?.promotion_id ? String(result.promotion_id) : null

    this.createdAt = new Date(result.created_at)
    this.updatedAt = new Date(result.updated_at)
  }
}
