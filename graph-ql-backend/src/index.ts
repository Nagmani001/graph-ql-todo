import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import express from 'express';

const schema = buildSchema(`type Query { hello: String } `);

const root = {
  hello() {
    return 'Hello world!';
  },
};

const app = express();

app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
  }),
);

app.listen(4000);
console.log('running graphql server on port 4000');
