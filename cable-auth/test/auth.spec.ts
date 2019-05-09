import {User} from '../src/auth/user';
import {Env} from '../src/env';
const expect = require('chai').expect;

describe('Env', () => {

  // test a functionality
  it('Should have Google Project', async() => {
    expect(Env.googleProject).to.equal('cable-cms');
  })

});

describe('Test User', () => {

  // test a functionality
  it('should exist', async() => {
    const user = await User.get('test@pinelab.com');
    expect(user.email).to.equal('test@pinelab.com');
  })

});
