export type FindAllParams = {
  select?: string;
  page: number;
  pagesize: number;
}

export type FindOneParams = {
  where: any;
  select?: string;
}

export type UpdateParams = {
  where: any;
  data: any;
}
