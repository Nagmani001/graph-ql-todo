import { createHandler } from 'graphql-http/lib/use/express';
import cors from "cors";
import express from 'express';
import { schema } from './schema';
import { resolvers } from './resolvers';
import { ruruHTML } from 'ruru/server';

const app = express();

app.use(cors());
app.use(express.json());

app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: resolvers,
  }),
);

app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.listen(4000, () => {
  console.log("Server running on port 4000 ");
});
