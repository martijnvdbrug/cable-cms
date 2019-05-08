import {DatabaseClientInterface} from './database-client.interface';

export interface EntityInterface<T> {

  client: DatabaseClientInterface<T>;
  get(id: string): Promise<T>;
  create(entity: Partial<T>): Promise<T>;
  save(): Promise<T>;

}