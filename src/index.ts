import express from 'express';
import { graphqlController } from './controllers/graphql';

const app = express();

app.use('/graphql', graphqlController);

app.listen(5001, () => {
  console.log('Listening on port 5001');
});
