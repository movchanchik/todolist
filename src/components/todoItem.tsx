import { useState } from "react";
import { TodoType, TodoItemType } from "../types/todo";
import { Formik, Form, Field } from "formik";
import { UpdateSchema } from "./formScheme";

function TodoItem({
  item,
  onClickRemove,
  onUpdateTodo,
  handleCheckForDuplicates,
}: TodoItemType) {
  const [isUpdateMode, updateIsUpdatedMode] = useState<boolean>(false);
  const [todo, updateTodo] = useState(item);

  const handleClickRemove = (_id: string) => {
    onClickRemove(_id);
  };

  const handleUpdate = (newValue: TodoType) => {
    onUpdateTodo(newValue);
    updateTodo(newValue);
    updateIsUpdatedMode(false);
  };

  const handleCompleted = (todo: TodoType) => {
    onUpdateTodo(todo);
    updateTodo(todo);
  };

  return (
    <li className="flex flex-row justify-between pb-3">
      <Formik
        onSubmit={(values) => {
          handleUpdate({
            _id: todo!._id,
            todo: values.todo,
            completed: todo.completed,
          });
        }}
        initialValues={{ todo: item.todo }}
        validationSchema={UpdateSchema}
        validate={(values) => {
          const errors: { todo?: string } = {};
          if (handleCheckForDuplicates(values.todo, item.todo)) {
            errors.todo = "Todo item must be unique";
          }
          return errors;
        }}
      >
        {({ errors }) => (
          <Form className="max-w-screen-lg mx-auto w-full">
            <div className="flex flex-row items-start justify-between w-full">
              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-row items-center justify-start gap-7  h-11 w-full">
                  {!isUpdateMode && (
                    <Field
                      type="checkbox"
                      name="completed"
                      onClick={() => {
                        handleCompleted({
                          _id: todo!._id,
                          todo: todo.todo,
                          completed: !todo.completed,
                        });
                      }}
                      className="w-6 h-6"
                    />
                  )}
                  {isUpdateMode ? (
                    <Field
                      name="todo"
                      placeholder="Update your todo"
                      className={
                        errors.todo
                          ? `rounded min-w-72 text-cyan-900 border-2 w-full border-red-700`
                          : "rounded min-w-72 text-cyan-900 border-2 w-full"
                      }
                    />
                  ) : (
                    <div className="text-lg leading-5 text-left">
                      {todo.todo}
                    </div>
                  )}
                </div>
                {errors.todo && (
                  <div className="self-start text-red-700">{errors.todo}</div>
                )}
              </div>
              <button
                type={!isUpdateMode ? "submit" : "button"}
                onClick={() => {
                  updateIsUpdatedMode(!isUpdateMode);
                }}
                disabled={!!errors.todo}
                className={
                  errors.todo
                    ? `uppercase text-sm font-semibold tracking-wider text-white py-3 px-6 rounded mx-1 bg-slate-300 cursor-not-allowed`
                    : "bg-cyan-900 uppercase text-sm font-semibold tracking-wider text-white py-3 px-6 rounded mx-1"
                }
              >
                Update
              </button>

              <button
                type="button"
                onClick={() => handleClickRemove(todo._id!)}
                className={`uppercase text-sm font-semibold tracking-wider text-white py-3 px-6 rounded mx-1 bg-cyan-950`}
              >
                Remove
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </li>
  );
}

export default TodoItem;
