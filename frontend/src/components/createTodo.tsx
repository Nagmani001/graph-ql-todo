import axios from "axios";
import { useState, type ChangeEvent } from "react";
import { BASE_URL } from "../config/utils";

/*
  {
    "query": "mutation($input: CreateTodoInput!) { createTodo(input: $input) { id title description completed createdAt updatedAt } }",
    "variables": {
      "input": {
        "title": "Learn GraphQL",
        "description": "Complete the GraphQL tutorial"
      }
    }
  }
 */

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = async () => {
    try {
      await axios.post(BASE_URL, {
        "query": "mutation($input: CreateTodoInput!) { createTodo(input: $input) { id title description completed createdAt updatedAt } }",
        "variables": {
          "input": {
            "title": title,
            "description": description
          }
        }
      });
      console.log("done");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Create a Todo
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter todo title"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 font-medium mb-1"
          htmlFor="description"
        >
          Description
        </label>
        <input
          id="description"
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <button
        onClick={handleAddTodo}
        className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition-colors duration-200"
      >
        Add Todo
      </button>
    </div>
  );
}
