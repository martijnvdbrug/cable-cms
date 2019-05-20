import {User} from '../src/user/user';

(async () => {

  const email = process.argv[2];
  const password = process.argv[3];
  const token = process.argv[4];
  const host = process.argv[5];

  if (!email || !password || !token || !host) {
    throw Error(`No email, password or token given`);
  }

  const user = new User({
    email,
    token,
    password,
    host
  });
  await user.save();

  process.exit(0);
})();