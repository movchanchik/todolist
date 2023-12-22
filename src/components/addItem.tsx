import { Formik, Form, Field } from "formik";
import { CreateTodoType } from "../types/todo";
import { AddSchema } from "../components/formScheme";

function AddItem({ handleSubmit }: CreateTodoType) {
  return (
    <Formik
      onSubmit={(values, actions) => {
        handleSubmit({ todo: values.todo, completed: false });
        actions.resetForm();
      }}
      validationSchema={AddSchema}
      validateOnBlur={false}
      initialValues={{ todo: "" }}
    >
      {({ errors }) => (
        <Form className="max-w-screen-lg mx-auto w-full">
          <div className="flex flex-row items-start justify-center">
            <div className="flex flex-col items-center justify-center w-full relative pb-7">
              <Field
                id="newTodo"
                name="todo"
                placeholder="Enter your new todo"
                className={
                  errors.todo
                    ? `rounded min-w-72 text-cyan-900 border-2 w-full border-red-700`
                    : "rounded min-w-72 text-cyan-900 border-2 w-full"
                }
              />
              {errors.todo && (
                <div className="self-start text-red-700 absolute bottom-0">
                  {errors.todo}
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={!!errors.todo}
              className={
                errors.todo
                  ? `uppercase text-sm font-semibold tracking-wider text-white py-3 px-6 rounded mx-1 bg-slate-300 cursor-not-allowed`
                  : "bg-cyan-900 uppercase text-sm font-semibold tracking-wider text-white py-3 px-6 rounded mx-1"
              }
            >
              Add
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
export default AddItem;
