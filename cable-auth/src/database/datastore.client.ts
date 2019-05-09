import {Datastore} from '@google-cloud/datastore';
import {Env} from '../env';
import {DatabaseClientInterface} from './database-client.interface';

export class DatastoreClient<T> implements DatabaseClientInterface<T> {

  datastore: Datastore;

  constructor(private kind: string) {
    this.datastore = new Datastore({
      projectId: Env.googleProject
    });
  }

  async save(entity: Partial<T>): Promise<void> {

    const key = (<any>entity).id ? this.datastore.key([this.kind, (<any>entity).id]) : this.datastore.key([this.kind]);

    // Prepares the new entity
    const datastoreEntity = {
      key: key,
      data: entity
    };

    // Saves the entity
    await this.datastore.save(datastoreEntity);
  }

  async get(entityId: string): Promise<T> {

    const key = this.datastore.key([this.kind, entityId]);
    // Saves the entity
    const [entity] = await this.datastore.get(key);
    return entity;
  }
}