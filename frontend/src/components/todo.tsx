import { useState } from "react";
import axios from "axios";
import type { Todo } from "../types/typescriptTypes";
import { BASE_URL } from "../config/utils";

export default function TodoComp({
  title,
  description,
  completed: initialCompleted,
  createdAt,
  updatedAt,
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
    <div
      key={id}
      className="flex flex-col gap-2 p-4 rounded-2xl shadow-sm border border-gray-200 bg-white hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${completed
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
            }`}

        >
          {completed ? "Completed" : "Pending"}
        </span>
      </div>

      <p className="text-sm text-gray-600">{description}</p>

      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>Created: {new Date(createdAt).toLocaleDateString()}</span>
        <span>Updated: {new Date(updatedAt).toLocaleDateString()}</span>
      </div>

      <button
        onClick={handleToggle}
        disabled={loading}
        className={`mt-3 self-end px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200
          ${completed
            ? "bg-red-100 text-red-700 hover:bg-red-200"
            : "bg-green-100 text-green-700 hover:bg-green-200"
          }
          ${loading ? "opacity-60 cursor-not-allowed" : ""}
        `}
      >
        {loading
          ? "Updating..."
          : completed
            ? "Mark as Pending"
            : "Mark as Done"}
      </button>
    </div>
  );
}
