import { PromotionDTO } from './PromotionDTO'

export interface ProductDTO {
  id?: string;
  name: string;
  photoUrl: string;
  price: number;
  categoryId: string;
  restaurantId?: string;
  promotion?: PromotionDTO | null
}
