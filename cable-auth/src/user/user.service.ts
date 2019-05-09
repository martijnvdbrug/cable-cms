import {User} from './user';
import crypto = require('crypto');

export class UserService {

  static async isValid(email: string, passwordHash: string): Promise<boolean> {
    const user = await User.get(email);
    if (!user) {
      return false;
    }
    return user.passwordHash === passwordHash;
  }

  static hash(password: string): string {
    return crypto.createHash('md5').update(password).digest('hex');
  }

  static async getToken(email: string, passwordHash: string): Promise<string> {
    if (await UserService.isValid(email, passwordHash)) {
      return (await User.get(email)).token;
    }
    throw new Error(`Invalid password for ${email}`);
  }

}