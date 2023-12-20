import { useState } from "react";
import EditItem from "./editItem";

type TodoItemType = {
  item: string;
  onClickRemove: (item: string) => void;
  onUpdateTodo: (oldValue: string, newValue: string) => void;
  checkDuplicates: (
    newValue: string,
    oldValue?: string,
    isUpdateMode?: boolean
  ) => boolean;
};
const buttonClass =
  "bg-cyan-900 uppercase text-sm font-semibold tracking-wider text-white py-3 px-6 rounded mx-1";
function TodoItem({
  item,
  onClickRemove,
  onUpdateTodo,
  checkDuplicates,
}: TodoItemType) {
  const [mode, updateMode] = useState<"view" | "update">("view");
  const handleClickRemove = (item: string) => {
    onClickRemove(item);
  };
  const handleClickUpdate = () => {
    if (mode === "view") {
      updateMode("update");
    } else {
      updateMode("view");
    }
  };

  const handleUpdate = (oldValue: string, newValue: string) => {
    onUpdateTodo(oldValue, newValue);
    updateMode("view");
  };

  return (
    <li className="flex flex-row justify-between pb-3">
      {mode === "view" ? (
        <p>{item}</p>
      ) : (
        <EditItem
          initialValue={item}
          handleSubmit={(newValue) => handleUpdate(item, newValue)}
          mode="update"
          checkDuplicates={(newValue) => checkDuplicates(newValue, item, true)}
        />
      )}
      <div>
        {mode === "view" && (
          <button onClick={handleClickUpdate} className={buttonClass}>
            Update
          </button>
        )}
        <button
          onClick={() => handleClickRemove(item)}
          className={`${buttonClass} bg-cyan-950`}
        >
          Remove
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
