import {User} from './user';
import crypto = require('crypto');

export class UserService {

  static hash(password: string): string {
    return crypto.createHash('md5').update(password).digest('hex');
  }

  /**
   * Validates password and host for email. If valid, returns token
   * @param email
   * @param passwordHash
   * @param host
   */
  static async getToken(email: string, passwordHash: string, host: string): Promise<string> {
    const user = await User.get(email);
    if ( !user.isAllowedForHost(host) || !user.isValid(passwordHash)) {
      throw new Error(`User ${email} is not allowed for host ${host} or password is invalid`);
    }
    return user.token;
  }

}