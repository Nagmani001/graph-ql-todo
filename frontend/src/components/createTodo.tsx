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
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
        />
        
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
        />
        
        <button
          onClick={handleAddTodo}
          disabled={!title.trim()}
          className="w-full py-3 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 text-white rounded-lg transition-colors"
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}
