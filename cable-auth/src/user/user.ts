import {DatabaseClientInterface} from '../database/database-client.interface';
import {DatastoreClient} from '../database/datastore.client';
import {EntityInterface} from '../database/entity.interface';
import {UserInputInterface} from './user-input.interface';
import {UserService} from './user.service';

export class User implements EntityInterface<User> {

  private static client: DatabaseClientInterface<User> = new DatastoreClient('User');

  public email: string;
  public passwordHash: string;
  public token: string;
  public host: string;

  get id(): string { // Only getter, because id should always be email
    return this.email;
  }

  constructor(input: UserInputInterface) {
    this.passwordHash = input.passwordHash ? input.passwordHash : UserService.hash(input.password);
    this.email = input.email;
    this.token = input.token;
    this.host = input.host.toLowerCase();
  }

  static async get(email: string): Promise<User> {
    const userData = await User.client.get(email);
    if (!userData) {
      throw Error(`${email} doesn't exist`);
    }
    return new User(userData);
  }

  async save(): Promise<User> {
    await User.client.save({
      id: this.id,
      email: this.email,
      passwordHash: this.passwordHash,
      token: this.token,
      host: this.host
    });
    return this;
  }

  isValid(passwordHash: string): boolean {
    return this.passwordHash === passwordHash;
  }

  isAllowedForHost(host: string): boolean {
    if ( !host || !this.host) {
      return false;
    } else if (this.host === '*') {
      return true;
    } else {
      return host.toLowerCase().indexOf(this.host) > -1;
    }
  }


}