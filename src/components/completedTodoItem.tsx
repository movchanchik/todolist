import { TodoType } from "../types/todo";
import { Formik, Form } from "formik";
import { UpdateSchema } from "./formScheme";
import { ItemType } from "../types/todo";
import { MdOutlineDone } from "react-icons/md";

function CompletedTodoItem({ item, onClickRemove, onUpdateTodo }: ItemType) {
  const handleClickRemove = (id: string) => {
    onClickRemove(id);
  };

  const handleReturn = (todo: TodoType) => {
    onUpdateTodo(todo);
  };

  return (
    <li className="my-3">
      <Formik
        onSubmit={(values) => {
          handleReturn({
            _id: item!._id,
            todo: values.todo,
            completed: !item.completed,
          });
        }}
        initialValues={{ todo: item.todo }}
        validationSchema={UpdateSchema}
      >
        {() => (
          <Form className="max-w-screen-lg mx-auto w-full">
            <div className="flex flex-row items-start justify-between w-full">
              <div className="flex flex-row items-center justify-start gap-7  h-11 w-full">
                <MdOutlineDone size="24" className="text-green-600" />
                <div className="text-lg leading-5 text-left">{item.todo}</div>
              </div>
              <button
                type="submit"
                className={
                  "bg-cyan-900 uppercase text-sm font-semibold tracking-wider text-white py-3 px-6 rounded mx-1"
                }
              >
                Return
              </button>

              <button
                type="button"
                onClick={() => handleClickRemove(item._id!)}
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
export default CompletedTodoItem;
