let todos: any[] = [];
let nextId = 1;

export const resolvers = {
  todos: () => {
    return todos;
  },

  todo: ({ id }: { id: string }) => {
    return todos.find(todo => todo.id === id);
  },

  createTodo: ({ input }: { input: { title: string; description?: string } }) => {
    const newTodo = {
      id: nextId.toString(),
      title: input.title,
      description: input.description || '',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    todos.push(newTodo);
    nextId++;

    return newTodo;
  },

  updateTodo: ({ input }: { input: { id: string; title?: string; description?: string; completed?: boolean } }) => {
    const todoIndex = todos.findIndex(todo => todo.id === input.id);

    if (todoIndex === -1) {
      throw new Error(`Todo with id ${input.id} not found`);
    }

    const updatedTodo = {
      ...todos[todoIndex],
      ...(input.title !== undefined && { title: input.title }),
      ...(input.description !== undefined && { description: input.description }),
      ...(input.completed !== undefined && { completed: input.completed }),
      updatedAt: new Date().toISOString()
    };

    todos[todoIndex] = updatedTodo;

    return updatedTodo;
  },

  deleteTodo: ({ id }: { id: string }) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
      throw new Error(`Todo with id ${id} not found`);
    }

    todos.splice(todoIndex, 1);

    return true;
  }
};
