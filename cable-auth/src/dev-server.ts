import cors = require('cors');
import * as bodyParser from 'body-parser';
import {app} from './auth-handler';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.listen(8080, () => console.log(`🐞 Devserver listening on localhost:8080`));
