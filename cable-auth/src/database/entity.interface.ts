export interface EntityInterface<T> {

  save(): Promise<T>;

}