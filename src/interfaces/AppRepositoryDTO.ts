export type FindAllParams = {
  select?: string;
  page: number;
  pagesize: number;
}

export type FindOneParams = {
  where: any;
  select?: string;
}
