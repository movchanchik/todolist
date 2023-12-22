import axios from "axios";
import { TodoType } from "../types/todo";

export const getListTodos = async (completed: boolean) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/`, {
    params: { completed: completed },
  });
  return data;
};

export const addNewTodo = async (newTodo: TodoType) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/`,
    newTodo
  );
  return data;
};

export const updateTodo = async (todo: TodoType) => {
  const newTodo = {
    todo: todo.todo,
    completed: todo.completed,
  };
  console.log(todo);
  const { data } = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/${todo._id}`,
    newTodo
  );
  return data;
};

export const removeTodo = async (id: string) => {
  const { data } = await axios.delete(`${import.meta.env.VITE_BASE_URL}/${id}`);
  return data;
};
