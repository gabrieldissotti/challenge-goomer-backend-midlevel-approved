export interface PaginationDTO {
  pagination: {
    page: number,
    totalPages: number,
    pagesize: number,
    totalItems: number
  },
  items: any[]
}

export interface PaginationParamsDTO {
  page: number,
  pagesize: number,
}
