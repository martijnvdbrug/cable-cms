import {User} from '../src/user/user';
import {Env} from '../src/env';
import {UserService} from '../src/user/user.service';
const expect = require('chai').expect;

describe('Env', () => {

  // test a functionality
  it('Should have Google Project', async() => {
    expect(Env.googleProject).to.equal('cable-cms');
  });

});

describe('User', () => {

  it('Should exist', async() => {
    const user = await User.get('test@pinelab.nl');
    expect(user.email).to.equal('test@pinelab.nl');
  });

  it('Should be invalid', async() => {
    const isValid = await UserService.isValid('test@pinelab.nl', 'not-existing');
    expect(isValid).to.equal(false);
  });

  it('Should get token', async() => {
    const token = await UserService.getToken('test@pinelab.nl', UserService.hash('test'));
    expect(token).to.equal('test-token');
  });

});
