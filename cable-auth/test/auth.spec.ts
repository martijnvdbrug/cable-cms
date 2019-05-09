import {User} from '../src/auth/user';

describe('#sum()', () => {

  // test a functionality
  it('Test user exists', async() => {

    const user = await User.get('test@pinelab.com');
    console.log(user);
    expect(user.email).to.equal('test@pinelab.com');
  })

});
