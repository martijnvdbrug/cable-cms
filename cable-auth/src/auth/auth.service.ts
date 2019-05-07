import {DatastoreClient} from '../lib/datastore.client';

export namespace AuthService {

  const userEntityKind = 'User';
  const datastoreClient = new DatastoreClient();

  export function validateCredentials(email: string, passwordHash) {


  }

}