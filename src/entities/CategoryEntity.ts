export default class CategoryEntity {
  public static table: string = 'categories';
  public static schema: string = 'public';

  public id: string;
  public name: string;

  public createdAt: Date;
  public updatedAt: Date;

  constructor (result: any) {
    this.id = String(result.id)
    this.name = String(result.name)

    this.createdAt = new Date(result.created_at)
    this.updatedAt = new Date(result.updated_at)
  }
}
