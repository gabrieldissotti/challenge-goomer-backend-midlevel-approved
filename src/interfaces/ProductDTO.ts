import { PromotionDTO } from './PromotionDTO'
import { WorkingHourToPromotionDTO } from './WorkingHourDTO'
import { PaginationDTO, PaginationParamsDTO } from './PaginationDTO'

export interface ProductDTO {
  id?: string;
  name: string;
  photoUrl: string;
  price: number;
  categoryId: string;
  restaurantId?: string;
  promotion?: PromotionDTO | null
}

export interface FindAllProductsParamsDTO
  extends PaginationParamsDTO {
    restaurantId: string
}

export type FindAllProductsResponseDTO =
  PaginationDTO & {
    items: Array<ProductDTO & {
      promotion: null | PromotionDTO & {
        workingHours: WorkingHourToPromotionDTO
      }
    }>
  }
