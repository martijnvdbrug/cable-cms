import express = require('express');
import cors = require('cors');
import * as bodyParser from 'body-parser';
import {UserService} from '../user/user.service';

require('dotenv').config();

export const authHandler = express();

authHandler.use(bodyParser.urlencoded({ extended: true }));
authHandler.use(bodyParser.json());
authHandler.use(cors());

authHandler.post('/auth', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const host = req.get('origin');
  if (!password || !email) {
    res.send(500, `email and password are needed to authenticate!`);
  }
  try {
    const token = await UserService.getToken(email, password, host);
    console.log(`${email} logged in for host ${host} and got token ${token}`);
    return res.send({
      token: token,
      provider: 'github'
    });
  } catch (err) {
    console.error(`Error authentication email ${email} with password ${password}: ${err.message}`);
    res.send(500, {
      error: `Unable to authenticate ${email}`
    });
  }
});

authHandler.get('/status', (req, res) => {
  res.send(`ok`)
});
