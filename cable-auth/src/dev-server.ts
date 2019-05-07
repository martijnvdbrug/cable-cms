import express = require('express');
import cors = require('cors');
import * as bodyParser from 'body-parser';
import {authHandler} from './auth-handler';

export const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', authHandler);
app.listen(8081, () => console.log(`🐞 Devserver listening on localhost:8081`));
