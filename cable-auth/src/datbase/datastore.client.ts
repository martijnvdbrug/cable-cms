import {Datastore} from '@google-cloud/datastore';
import {google} from '@google-cloud/datastore/build/proto/datastore';
import {DatabaseClientInterface} from '../interface/database-client.interface';
import ICommitResponse = google.datastore.v1.ICommitResponse;
import Entity = google.datastore.v1.Entity;

export class DatastoreClient<T> implements DatabaseClientInterface<T>{

  datastore: Datastore;

  constructor(private kind: string){
    this.datastore = new Datastore();
  }

  async save(entity: Partial<T>): Promise<T> {

    const key = (<any> entity).id ? this.datastore.key([this.kind, (<any> entity).id]) : this.datastore.key([this.kind]);

    // Prepares the new entity
    const datastoreEntity = {
      key: key,
      data: entity
    };

    // Saves the entity
    const result = await this.datastore.save(datastoreEntity);
    return this.datastore.get(result.mutationResults[0].key)
  }

  async get(entityId: string): Promise<T> {

    const key = this.datastore.key([this.kind, entityId]);
    // Saves the entity
    return this.datastore.get(key);
  }
}