import {DatastoreClient} from '../datbase/datastore.client';
import {DatabaseClientInterface} from '../interface/database-client.interface';
import {EntityInterface} from '../interface/entity.interface';

export class User implements EntityInterface<User> {

  static client: DatabaseClientInterface<User> = new DatastoreClient('User');

  public id: string;
  public email: string;
  public passwordHash: string;

  static get(id: string): Promise<User> {
    return User.client.get(id);
  }

  static new(entity: Partial<User>): Promise<User> {
    return User.client.save(entity);
  }

  save(): Promise<User> {
    return User.client.save({
      id: this.id,
      email: this.email,
      passwordHash: this.passwordHash
    });
  }


}