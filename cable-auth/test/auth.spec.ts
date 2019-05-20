import {User} from '../src/user/user';
import {Env} from '../src/env';
import {UserService} from '../src/user/user.service';
import {testUser} from './testuser';
const expect = require('chai').expect;

let user: User;

describe('Env', () => {

  // test a functionality
  it('Should have Google Project', async() => {
    expect(Env.googleProject).to.equal('cable-cms');
  });

});

describe('User', () => {

  it('Should exist', async() => {
    user = await User.get(testUser.email);
    expect(user.email).to.equal(testUser.email);
  });

  it('Password should be invalid', async() => {
    expect(user.isValid('bogusPassword')).to.equal(false);
  });

  it('Should not be allowed for host', async() => {
    expect(user.isAllowedForHost('bogusHost')).to.equal(false);
  });

  it('Should get token', async() => {
    const token = await UserService.getToken(testUser.email, UserService.hash(testUser.password), testUser.host);
    expect(token).to.equal(testUser.token);
  });

});
