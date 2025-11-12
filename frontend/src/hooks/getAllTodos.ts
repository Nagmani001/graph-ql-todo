import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config/utils";
import type { Todo } from "../types/typescriptTypes";

export function getAllTodos() {

  const [todos, setTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    const getAllTodos = async () => {
      try {
        const todos = await axios.post(BASE_URL, {
          query: `query MyQuery {
  todos {
    completed
    createdAt
    description
    id
    title
    updatedAt
  }
}`});
        setTodos(todos.data.data.todos);

      } catch (err) {
        alert("error");
      }
    }
    getAllTodos();
  }, []);

  return todos;
}
