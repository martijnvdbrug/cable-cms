import {Datastore} from '@google-cloud/datastore';
import {google} from '@google-cloud/datastore/build/proto/datastore';
import ICommitResponse = google.datastore.v1.ICommitResponse;
import Entity = google.datastore.v1.Entity;

export class DatastoreClient {

  datastore: Datastore;

  constructor(){
    this.datastore = new Datastore();
  }

  async save(entity: any, kind: string): Promise<ICommitResponse> {

    const key = entity.id ? this.datastore.key([kind, entity.id]) : this.datastore.key([kind]);

    // Prepares the new entity
    const datastoreEntity = {
      key: key,
      data: entity
    };

    // Saves the entity
    return this.datastore.save(datastoreEntity);
  }

  async get(entityId: string, kind: string): Promise<Entity> {

    const key = this.datastore.key([kind, entityId]);
    // Saves the entity
    return this.datastore.get(key);
  }
}