import express = require('express');
import cors = require('cors');
require('dotenv').config();

export const app = express();
app.use(cors());

app.post('/auth', (req, res) => {

console.log('BODIETJE', req);
  return res.send({
    token: `${process.env.token}`,
    provider: 'github'
  });
});

app.get('/', (req, res) => {
  res.redirect('auth');
});
