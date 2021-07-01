import { Weekday } from '@interfaces/Weekday'

export interface WorkingHourToRestaurantDTO {
  id?: string;
  weekday: Weekday;
  startAt: string;
  finishAt: string;
  restaurantId?: string;
}

export interface WorkingHourToPromotionDTO {
  id?: string;
  weekday: Weekday;
  startAt: string;
  finishAt: string;
  promotionId?: string;
}
