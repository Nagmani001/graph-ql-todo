import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Todo {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input CreateTodoInput {
    title: String!
    description: String
  }

  input UpdateTodoInput {
    id: ID!
    title: String
    description: String
    completed: Boolean
  }

  type Query {
    todos: [Todo!]!
    todo(id: ID!): Todo
  }

  type Mutation {
    createTodo(input: CreateTodoInput!): Todo!
    updateTodo(input: UpdateTodoInput!): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`);
