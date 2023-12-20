import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface TodoForm {
  initialValue: string;
  handleSubmit: (input: string) => void;
  mode: "add" | "update";
  checkDuplicates: (
    newValue: string,
    oldValue?: string,
    isUpdateMode?: boolean
  ) => boolean;
  className?: string;
}

const inputClass = "rounded min-w-72 text-cyan-900 border-2 w-full";
const buttonClass =
  "bg-cyan-900 uppercase text-sm font-semibold tracking-wider text-white py-3 px-6 rounded mx-1";

function EditItem({
  initialValue,
  handleSubmit,
  mode,
  checkDuplicates,
  className,
}: TodoForm) {
  const SignupSchema = Yup.object().shape({
    todo: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .test("Unique", "Values need te be unique", (value) => {
        return !checkDuplicates(value!);
      }),
  });

  return (
    <Formik
      onSubmit={(values, actions) => {
        handleSubmit(values.todo);
        actions.resetForm();
      }}
      initialValues={{
        todo: initialValue,
      }}
      validationSchema={SignupSchema}
      className={className}
    >
      {({ errors }) => (
        <Form className="max-w-screen-lg mx-auto w-full">
          {mode === "add" && (
            <div className="flex flex-row items-start justify-center">
              <div className="flex flex-col items-center justify-center w-full relative pb-7">
                <Field
                  id="newTodo"
                  name="todo"
                  placeholder="Enter your new todo"
                  className={
                    errors.todo ? `${inputClass} border-red-700` : inputClass
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
                    ? `${buttonClass} bg-slate-300 cursor-not-allowed`
                    : buttonClass
                }
              >
                Add
              </button>
            </div>
          )}
          {mode === "update" && (
            <div className="flex flex-row items-start justify-between w-full">
              <div className="flex flex-col items-center justify-center w-full relative pb-7">
                <Field
                  name="todo"
                  placeholder="Update your todo"
                  initialValue={initialValue}
                  className={
                    errors.todo ? `${inputClass} border-red-700` : inputClass
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
                    ? `${buttonClass} bg-slate-300 cursor-not-allowed`
                    : buttonClass
                }
              >
                Update
              </button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}
export default EditItem;
