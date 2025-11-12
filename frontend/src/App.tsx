import type { Todo } from "./types/typescriptTypes";
import TodoComp from "./components/todo";
import { getAllTodos } from "./hooks/getAllTodos";
import CreateTodo from "./components/createTodo";

export default function App() {

  const todos = getAllTodos();

  if (!todos) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Section - Bigger */}
      <div className="bg-white shadow-sm py-16">
        <div className="max-w-2xl mx-auto text-center px-6">
          <h1 className="text-6xl font-light text-gray-800 mb-4">Todo</h1>
          <p className="text-gray-500">Keep track of your tasks</p>
        </div>
      </div>

      {/* Main Content - Centered */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-12">
          <CreateTodo />
        </div>

        <div className="space-y-4">
          {todos.map((todo: Todo) => (
            <TodoComp 
              key={todo.id}
              title={todo.title} 
              description={todo.description} 
              completed={todo.completed} 
              createdAt={todo.createdAt} 
              updatedAt={todo.updatedAt} 
              id={todo.id} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}
