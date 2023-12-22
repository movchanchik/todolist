import { getListTodos } from "../utils/todoApi";
import { TodoItemType } from "../types/todo";

export const checkUniq = async (value: string) => {
  try {
    const todos = await getListTodos(false);
    const filteredTodos = todos.filter(
      (todo: TodoItemType) => todo.todo !== value
    );
    return todos.length === filteredTodos.length;
  } catch (error) {
    console.log(error);
    return false;
  }
};
