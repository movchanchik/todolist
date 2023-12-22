import TodoItem from "./todoItem";
import AddItem from "./addItem";
import { useState, useEffect } from "react";
import {
  getListTodos,
  addNewTodo,
  removeTodo,
  updateTodo,
} from "../utils/todoApi";
import { TodoType } from "../types/todo";
import CompletedTodoItem from "./completedTodoItem";

function TodoList() {
  const [todoList, updateTodoList] = useState<TodoType[]>([]);
  const [completedTodoList, updateCompleted] = useState<TodoType[]>([]);

  const getTodos = async () => {
    try {
      const todos = await getListTodos(false);
      updateTodoList([...todos]);
    } catch (error) {
      console.log(error);
    }
    try {
      const completedTodos = await getListTodos(true);
      updateCompleted([...completedTodos]);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickRemove = async (id: string) => {
    await removeTodo(id);
    const todos = await getListTodos(false);
    updateTodoList([...todos]);
    const completedTodos = await getListTodos(true);
    updateCompleted([...completedTodos]);
  };

  const handleAddNewItem = async (todo: TodoType) => {
    await addNewTodo(todo);
    const todos = await getListTodos(false);
    updateTodoList([...todos]);
  };

  const handleUpdateTodo = async (newValue: TodoType) => {
    await updateTodo(newValue);
    const todos = await getListTodos(false);
    updateTodoList([...todos]);
    const completedTodos = await getListTodos(true);
    updateCompleted([...completedTodos]);
  };

  const handleCheckForDuplicates = (newValue: string, oldValue: string) => {
    const duplicate = todoList.find((item) => {
      return item.todo === newValue && oldValue !== item.todo;
    });
    return duplicate !== undefined;
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl text-cyan-900 block font-semibold tracking-widest my-5">
        Todos list
      </h1>
      <AddItem handleSubmit={handleAddNewItem} />
      {todoList.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold text-cyan-900 text-left my-8">
            Ready for Action! Here are the tasks waiting for your attention:
          </h2>
          <ul className="list-none w-full max-w-screen-lg mx-auto">
            {todoList.map((item) => (
              <TodoItem
                key={item._id}
                item={item}
                onClickRemove={onClickRemove}
                onUpdateTodo={handleUpdateTodo}
                handleCheckForDuplicates={handleCheckForDuplicates}
              />
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-cyan-900 text-left my-8">
            No tasks to do right now. Take a break, but don't forget to come
            back!
          </h2>
        </>
      )}
      {completedTodoList.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold text-cyan-900 text-left my-8">
            Mission Accomplished! Here are your completed todos:
          </h2>
          <ul className="list-none w-full max-w-screen-lg mx-auto">
            {completedTodoList.map((item) => (
              <CompletedTodoItem
                key={item._id}
                item={item}
                onClickRemove={onClickRemove}
                onUpdateTodo={handleUpdateTodo}
              />
            ))}
          </ul>
        </>
      ) : (
        <h2 className="text-2xl font-bold text-cyan-900 text-left my-8">
          No completed todos yet. Keep up the good work!
        </h2>
      )}
    </div>
  );
}

export default TodoList;
