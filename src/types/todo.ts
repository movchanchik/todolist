export type TodoType = {
  _id?: string;
  todo: string;
  completed: boolean;
};

export interface TodoFormType {
  todo: TodoType;
  handleSubmit: (input: TodoType) => void;
  mode: "add" | "update";
  checkDuplicates: (
    newValue: string,
    oldValue?: string,
    isUpdateMode?: boolean
  ) => boolean;
  className?: string;
}

export interface CreateTodoType {
  handleSubmit: (input: TodoType) => void;
}

export type ItemType = {
  item: TodoType;
  onClickRemove: (id: string) => void;
  onUpdateTodo: (newValue: TodoType) => void;
};

export type TodoItemType = {
  item: TodoType;
  onClickRemove: (id: string) => void;
  onUpdateTodo: (newValue: TodoType) => void;
  handleCheckForDuplicates: (newValue: string, oldValue: string) => boolean;
};
