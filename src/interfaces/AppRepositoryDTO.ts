export type FindAllParams = {
  select?: string;
  page: number;
  pagesize: number;
  where?: any;
}

export type FindManyParams = {
  where: any;
  select?: string;
}

export type FindOneParams = {
  where: any;
  select?: string;
}

export type UpdateParams = {
  where: any;
  data: any;
}
