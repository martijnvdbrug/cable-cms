import express = require('express');
import {Env} from '../env';
require('dotenv').config();

export const authHandler = express();

authHandler.post('/auth', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!password || !email) {
    res.send(500, `email and password are needed to authenticate!`)
  }
  return res.send({
    token: `${Env.token}`,
    provider: 'github'
  });
});

authHandler.get('/', (req, res) => {
  res.redirect('auth');
});
