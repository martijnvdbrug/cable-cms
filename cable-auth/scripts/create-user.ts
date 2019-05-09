import {Env} from '../src/env';
import {User} from '../src/user/user';

(async() => {

  const email = process.argv[2];
  const password = process.argv[3];
  const token = process.argv[4];

  if (!email || !password || !token) {
    throw Error(`No email, password or token given`);
  }

  const user = new User({
    email,
    token,
    password
  });
  await user.save();

  process.exit(0)
})();