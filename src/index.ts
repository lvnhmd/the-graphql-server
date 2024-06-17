import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './schema';
import resolvers from './resolvers';

const app = express();

app.use('/graphql', createHandler({ schema, rootValue: resolvers }));

app.listen(4000, () => {
  console.log('GraphQL server is running on http://localhost:4000/graphql');
});
