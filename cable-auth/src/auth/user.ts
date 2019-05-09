import {DatastoreClient} from '../database/datastore.client';
import {DatabaseClientInterface} from '../database/database-client.interface';
import {EntityInterface} from '../database/entity.interface';

export class User implements EntityInterface<User> {

  private static client: DatabaseClientInterface<User> = new DatastoreClient('User');

  get id(): string { // Only getter, because id should always be email
    return this.email;
  }
  public email: string;
  public passwordHash: string;
  public token: string;

  static get(id: string): Promise<User> {
    return User.client.get(id);
  }

  async save(): Promise<User> {
    await User.client.save({
      id: this.id,
      email: this.email,
      passwordHash: this.passwordHash,
      token: this.token
    });
    return this;
  }


}