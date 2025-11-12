# GraphQL Todo API Backend

A complete GraphQL API for managing todos with full CRUD operations.

## Setup & Running

1. Install dependencies:
```bash
pnpm install
```

2. Run in development mode:
```bash
pnpm dev
```

3. Build for production:
```bash
pnpm build
pnpm start
```

The server will run on `http://localhost:4000/graphql`
GraphQL Playground available at `http://localhost:4000/`

## GraphQL Schema

### Types

```graphql
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
```

### Operations

#### Queries

1. **Get all todos**
```graphql
query {
  todos {
    id
    title
    description
    completed
    createdAt
    updatedAt
  }
}
```

2. **Get single todo**
```graphql
query($id: ID!) {
  todo(id: $id) {
    id
    title
    description
    completed
    createdAt
    updatedAt
  }
}
```

#### Mutations

1. **Create todo**
```graphql
mutation($input: CreateTodoInput!) {
  createTodo(input: $input) {
    id
    title
    description
    completed
    createdAt
    updatedAt
  }
}
```

2. **Update todo**
```graphql
mutation($input: UpdateTodoInput!) {
  updateTodo(input: $input) {
    id
    title
    description
    completed
    createdAt
    updatedAt
  }
}
```

3. **Delete todo**
```graphql
mutation($id: ID!) {
  deleteTodo(id: $id)
}
```

## HTTP Request Examples

All requests should be sent to `POST http://localhost:4000/graphql` with `Content-Type: application/json`.

### 1. Create a Todo

```json
{
  "query": "mutation($input: CreateTodoInput!) { createTodo(input: $input) { id title description completed createdAt updatedAt } }",
  "variables": {
    "input": {
      "title": "Learn GraphQL",
      "description": "Complete the GraphQL tutorial"
    }
  }
}
```

### 2. Get All Todos

```json
{
  "query": "query { todos { id title description completed createdAt updatedAt } }"
}
```

### 3. Get Single Todo

```json
{
  "query": "query($id: ID!) { todo(id: $id) { id title description completed createdAt updatedAt } }",
  "variables": { "id": "1" }
}
```

### 4. Update Todo (Complete/Incomplete)

```json
{
  "query": "mutation($input: UpdateTodoInput!) { updateTodo(input: $input) { id title description completed createdAt updatedAt } }",
  "variables": {
    "input": {
      "id": "1",
      "completed": true
    }
  }
}
```

### 5. Update Todo (Title & Description)

```json
{
  "query": "mutation($input: UpdateTodoInput!) { updateTodo(input: $input) { id title description completed createdAt updatedAt } }",
  "variables": {
    "input": {
      "id": "1",
      "title": "Learn GraphQL Advanced",
      "description": "Master GraphQL with subscriptions"
    }
  }
}
```

### 6. Delete Todo

```json
{
  "query": "mutation($id: ID!) { deleteTodo(id: $id) }",
  "variables": { "id": "1" }
}
```

## Testing with curl

You can test the API using curl:

```bash
# Create a todo
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation($input: CreateTodoInput!) { createTodo(input: $input) { id title description completed createdAt updatedAt } }",
    "variables": {
      "input": {
        "title": "Test Todo",
        "description": "This is a test todo"
      }
    }
  }'

# Get all todos
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { todos { id title description completed createdAt updatedAt } }"
  }'

# Toggle todo completion
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation($input: UpdateTodoInput!) { updateTodo(input: $input) { id completed } }",
    "variables": {
      "input": {
        "id": "1",
        "completed": true
      }
    }
  }'
```

## Features

- ✅ Create todos with title and optional description
- ✅ Read all todos or get a single todo by ID
- ✅ Update todo title, description, and completion status
- ✅ Delete todos by ID
- ✅ Automatic timestamps (createdAt, updatedAt)
- ✅ CORS enabled for frontend integration
- ✅ Error handling for invalid operations
- ✅ GraphQL Playground for testing
- ✅ Compatible with existing frontend

## Frontend Integration

This backend is designed to work seamlessly with the existing React frontend. The frontend expects:

- `todos` query to fetch all todos
- `createTodo` mutation to add new todos
- `updateTodo` mutation to toggle completion status
- All todos to have `id`, `title`, `description`, `completed`, `createdAt`, and `updatedAt` fields

## Notes

- Currently uses in-memory storage (todos are lost on server restart)
- For production, replace the in-memory storage with a proper database
- All todos have unique auto-incrementing IDs
- Timestamps are in ISO 8601 format
- CORS is enabled for all origins (configure for production)
