import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import schema from './schema';
import resolvers from './resolvers';
// @ts-ignore
import { ruruHTML } from "ruru/server";

const app = express();

app.use('/graphql', createHandler({ schema, rootValue: resolvers }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`GraphQL server is running on http://localhost:${PORT}/graphql`);
});

app.get("/", (req, res, next) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  return res.end(
    ruruHTML({
      endpoint: "/graphql",
    }),
  );
});