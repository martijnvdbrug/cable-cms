import express = require('express');
import {UserService} from '../user/user.service';

require('dotenv').config();

export const authHandler = express();

authHandler.post('/auth', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!password || !email) {
    res.send(500, `email and password are needed to authenticate!`);
  }
  try {
    const token = await UserService.getToken(email, password);
    return res.send({
      token: token,
      provider: 'github'
    });
  } catch (err) {
    console.error(`Error authentication email ${email} with password ${password}`);
    res.send(500, {
      error: err
    });
  }
});

authHandler.get('/status', (req, res) => {
  res.send(`ok`)
});

authHandler.get('/', (req, res) => {
  res.redirect('auth');
});
