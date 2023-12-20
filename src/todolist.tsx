import TodoItem from "./todoItem";
import EditItem from "./editItem";
import { useState } from "react";

function TodoList() {
  const [todoList, updateTodoList] = useState([
    "todo1",
    "todo2",
    "todo3",
    "todo4",
  ]);

  const onClickRemove = (item: string) => {
    updateTodoList(todoList.filter((el) => el != item));
  };

  const handleSubmit = (todo: string) => {
    updateTodoList([...todoList, todo]);
  };

  const handleUpdateTodo = (oldValue: string, newValue: string) => {
    updateTodoList(
      todoList.map((item) => {
        if (item === oldValue) {
          return newValue;
        } else {
          return item;
        }
      })
    );
  };

  const checkDuplicates = (
    newValue: string,
    oldValue?: string,
    isUpdateMode?: boolean
  ) => {
    return (
      todoList.find(
        (item) =>
          (item === newValue && !isUpdateMode) ||
          (item === newValue && item !== oldValue)
      ) !== undefined
    );
  };

  return (
    <>
      <h1 className="text-4xl text-cyan-900 block font-semibold tracking-widest my-5">
        Todos list
      </h1>
      <EditItem
        initialValue=""
        handleSubmit={handleSubmit}
        mode="add"
        checkDuplicates={checkDuplicates}
        className="addTodo"
      />
      <ul className="list-none w-full max-w-screen-lg mx-auto">
        {todoList.map((item, index) => (
          <TodoItem
            key={index}
            item={item}
            onClickRemove={onClickRemove}
            onUpdateTodo={handleUpdateTodo}
            checkDuplicates={checkDuplicates}
          />
        ))}
      </ul>
    </>
  );
}

export default TodoList;
