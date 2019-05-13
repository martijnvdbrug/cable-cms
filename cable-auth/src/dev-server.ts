import {authHandler} from './handlers';

authHandler.listen(8081, () => console.log(`🐞 Devserver listening on localhost:8081`));
