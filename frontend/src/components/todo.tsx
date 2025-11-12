import { useState } from "react";
import axios from "axios";
import type { Todo } from "../types/typescriptTypes";
import { BASE_URL } from "../config/utils";

export default function TodoComp({
  title,
  description,
  completed: initialCompleted,
  id,
}: Todo) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      await axios.post(BASE_URL, {
        query: `
          mutation {
            updateTodo(id: "${id}", input: { completed: ${!completed} }) {
              id
              completed
            }
          }
        `,
      });
      setCompleted(!completed);
    } catch (err) {
      console.error("Error updating todo:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className={`font-medium ${completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {title}
          </h3>
          {description && (
            <p className={`text-sm mt-1 ${completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {description}
            </p>
          )}
        </div>

        <button
          onClick={handleToggle}
          disabled={loading}
          className={`ml-4 px-3 py-1 text-sm rounded ${completed
            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            : 'bg-gray-800 text-white hover:bg-gray-900'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? '...' : completed ? 'Undo' : 'Done'}
        </button>
      </div>
    </div>
  );
}
