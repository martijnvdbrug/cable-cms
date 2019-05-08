export interface DatabaseClientInterface<T> {

  get(id): Promise<T>;
  save(entity: Partial<T>): Promise<T>;

}