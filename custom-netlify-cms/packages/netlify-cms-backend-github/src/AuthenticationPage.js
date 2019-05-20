import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import styled from '@emotion/styled';
import {AuthenticationPage, buttons, colors, colorsRaw, lengths, shadows} from 'netlify-cms-ui-default';
import {partial} from "lodash";
import * as crypto from 'crypto';

const LoginButton = styled.button`
  ${buttons.button};
  ${shadows.dropDeep};
  ${buttons.default};
  ${buttons.gray};

  padding: 0 30px;
  display: block;
  margin-top: 20px;
  margin-left: auto;
`;

const AuthForm = styled.form`
  width: 350px;
  margin-top: -80px;
`;

const ErrorMessage = styled.p`
  color: ${colors.errorText};
`;
const AuthInput = styled.input`
  background-color: ${colorsRaw.white};
  border-radius: ${lengths.borderRadius};

  font-size: 14px;
  padding: 10px 10px;
  margin-bottom: 15px;
  margin-top: 6px;
  width: 100%;
  position: relative;
  z-index: 1;

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px ${colors.active};
  }
`;

export default class GitHubAuthenticationPage extends React.Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    inProgress: PropTypes.bool,
    base_url: PropTypes.string,
    siteId: PropTypes.string,
    authEndpoint: PropTypes.string,
    config: ImmutablePropTypes.map,
    clearHash: PropTypes.func,
  };

  state = { email: '', password: '', errors: {} };

  handleChange = (name, e) => {
    this.setState({ ...this.state, [name]: e.target.value });
  };

  handleLogin = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const errors = {};

    if (!email) {
      errors.email = 'Emailadres is verplict';
    }
    if (!password) {
      errors.password = 'Wachtwoord is verplicht';
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    const body = {
      email,
      password: crypto.createHash('md5').update(password).digest('hex')
    };

    const url = `${this.props.base_url}${this.props.authEndpoint}`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => {
      res.json().then(data => {
        if (data.error) {
          errors.email = 'Onjuist emailadres of wachtwoord';
          this.setState({ errors });
          return;
        }
        this.props.onLogin(data);
      });
    });


  };

  render() {
    const { errors } = this.state;
    const { error, inProgress, config } = this.props;
    return (
      <AuthenticationPage
        logoUrl={config.get('logo_url')}
        renderPageContent={() => (
          <AuthForm onSubmit={this.handleLogin}>
            {!error ? null : <ErrorMessage>{error}</ErrorMessage>}
            {!errors.server ? null : <ErrorMessage>{errors.server}</ErrorMessage>}
            <ErrorMessage>{errors.email || null}</ErrorMessage>
            <AuthInput
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={partial(this.handleChange, 'email')}
            />
            <ErrorMessage>{errors.password || null}</ErrorMessage>
            <AuthInput
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={partial(this.handleChange, 'password')}
            />
            <LoginButton disabled={inProgress}>
              {inProgress ? 'Logging in...' : 'Login'}
            </LoginButton>
          </AuthForm>
        )}
      />
    );
  }
}
